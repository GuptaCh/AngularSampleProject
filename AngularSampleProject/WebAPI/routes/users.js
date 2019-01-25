var express = require('express');
var users = express.Router();
var database = require('../dbconnection');
var cors = require('cors')
var jwt = require('jsonwebtoken');
var token;

users.use(cors());

process.env.SECRET_KEY = "gupta";


users.post('/login', function(req, res) 
{

    var appData = {};
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);

    database.getConnection(function(err, connection) 
    {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM user WHERE email = ?', [email], function(err, rows, fields) 
            {
                if (err) 
                {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
                else 
                {
                    if (rows.length > 0) {
                        if (rows[0].password == password) 
                        {
                            let token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), process.env.SECRET_KEY, {
                                expiresIn: 2480
                            });
                            appData.error = 0;
                            appData["token"] = token;
                            appData["status"] = 200;
                            res.status(200).json(appData);
                        } 
                        else 
                        {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});


module.exports = users;
