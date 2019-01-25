var db = require('../dbconnection'); 
var Task = {  
    getAllTasks: function(callback) {  
        return db.query("Select * from  user", callback);  
    },  
    getTaskById: function(id, callback) {  
        return db.query("select * from user where Id=?", [id], callback);  
    },    
    addTask: function(Task, callback){
        return db.query("Insert into user values(?,?,?,?,?,?)",[Task.id, Task.firstname, Task.lastname, Task.username, Task.email, Task.password], callback);
     },
    deleteTask: function(id, callback) {  
        return db.query("delete from user where Id=?", [id], callback);  
    }, 
    updateTask: function(Task, callback) {  
        return db.query("update user set firstname=?,lastname=?,username=?,email=?,password=? where id=?", [Task.firstname, Task.lastname, Task.username, Task.email, Task.password, Task.id], callback);
    }

};   
module.exports = Task; 