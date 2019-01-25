import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App }        from './app';
import { Headers }    from '@angular/http';
import { ToastrService }                from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
 import 'rxjs/Rx';


@Injectable()
export class AppService {
app;

  private Url='http://localhost:3000/Tasks';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,
    private toastr: ToastrService){}

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



}