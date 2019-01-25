import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { AppService } from "src/app/app.service";
import { App } from 'src/app/app';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector:'Edit',
    templateUrl: './edit.component.html',
    styleUrls:['./edit.component.css']
})

export class EditComponent implements OnInit{
    app:any[];
    errorMessage:any;
    registerForm:FormGroup;
    firstname:FormControl;
    lastname:FormControl;
    username:FormControl;
    email:FormControl;

    constructor(
        private appService: AppService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) { 
    }


    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) => this.appService.getApp(params['id']))
        .subscribe(app => {
        this.app = app[0]
        });

        this.firstname = new FormControl('', Validators.required);
        this.lastname = new FormControl('', Validators.required);
        this.username = new FormControl('', Validators.required);
        this.email = new FormControl('', [Validators.required,Validators.email]);
    
      this.registerForm= new FormGroup({
        firstname:this.firstname,
        lastname:this.lastname,
        username:this.username,
        email:this.email
      })
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'email is required' :
          this.email.hasError('email') ? 'enter a valid email' :
              '';
    }
      
      getErrorFirst() {
        return this.firstname.hasError('required') ? 'first name is required':
        '' ;
      }
    
      getErrorLast() {
        return this.lastname.hasError('required') ? 'last name is required':
        '';
      }
      getErrorUser(){
        return this.username.hasError('required') ? 'user name is required':
        '';
      }
    

    update(app):void{
        this.appService.update(app)
        .subscribe(response=>{
        console.log(response);
        this.router.navigate(['/User']);
        this.toastr.success('updated successfully!');
       })
    }
  

} 

