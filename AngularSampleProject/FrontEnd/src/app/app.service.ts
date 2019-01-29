import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from './app';
import { Http, Response, Headers } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import 'rxjs/Rx';
import * as moment from "moment";
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Subject,Observable } from 'rxjs';
import {  Router } from '@angular/router';

@Injectable()
export class AppService {
app;

  private Url='http://localhost:3000/Tasks';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,){}

  getApps(){
    return this.http.get(this.Url);
  }

  getApp(id:string)  {
    console.log(JSON.stringify(id));
     return this.http.get(this.Url+'/'+id);
  }

  add(app:App){
    console.log(JSON.stringify(app));
    return this.http.post(this.Url,app);
  }

  update(app:App){
    console.log(JSON.stringify(app));
    return this.http.put(this.Url+'/',app);
  }

  remove(id:string){
    return this.http.delete(this.Url+'/'+id);
  }

  login(model)
  {
    // console.log(JSON.stringify(model));
    
    return this.http.post("http://localhost:3000/"+'users/login', model).map(response=>
      {
         console.log("Result Login state " + JSON.stringify(response));

         if(response!=null)
         {
          var resulobj=JSON.parse(JSON.stringify(response));
         
          if(resulobj.status==200)
          {
              if(resulobj.token!=null )
              {
     	         var tokenInfo = this.getDecodedAccessToken(resulobj.token); 
              var tokenObj=JSON.parse(JSON.stringify(tokenInfo));
              this.setSession(resulobj.token);
              this.router.navigate(['/User']);
              this.toastr.success("Login Sucessfully");
              return true;
              }
          }
          else 
          {
            var errmessage;
            if(response[0].status==204)
               errmessage="Email and Password does not match";
               else if(response[0].status==203)
               errmessage="Please Enter valid Email";
               this.toastr.error(errmessage);
          }
         }
         else
         {
           var errmessage;
             errmessage="Email and Password does not match";
             console.log("l");
             this.toastr.error(errmessage);
         }
    
       })
  }

  getDecodedAccessToken(token: string): any
  {
   try{
       return jwt_decode(token);
     }
   catch(Error)
   {
       return null;
   }
 }
 private setSession(authResult) 
 {
   localStorage.setItem('token', authResult);
 }  
 
 logout() 
 {
   localStorage.removeItem("token");
   localStorage.clear();
   this.router.navigate(['']);
   this.toastr.success("LogOut Sucessfully");
  }

  public isLoggedIn() 
  {
   return tokenNotExpired();
  }

  isLoggedOut()
  {
   return !this.isLoggedIn();
  }

 getExpiration() 
 {
   const expiration = localStorage.getItem("expires_at");
   const expiresAt = JSON.parse(expiration);
   return moment(expiresAt);
 }
 get CurrentUser()
 {
   let token=localStorage.getItem('token');
   if(!token) return null;
   return new JwtHelper().decodeToken(token);
 }

}