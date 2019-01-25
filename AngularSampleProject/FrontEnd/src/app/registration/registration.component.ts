 import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '../app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  register:any[];
  errorMessage:any;
  registerForm:FormGroup;
  firstname:FormControl;
  lastname:FormControl;
  email:FormControl;
  password:FormControl;
  mobilenumber:FormControl;
  username:FormControl;

  constructor(
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { 
  }


  ngOnInit(){
    this.firstname = new FormControl('', [Validators.required,Validators.minLength(3)]);
    this.lastname = new FormControl('', [Validators.required,Validators.minLength(3)]);
    this.username = new FormControl('', [Validators.required,Validators.minLength(3)]);
    this.email = new FormControl('', [Validators.required,Validators.email]);
    this.password = new FormControl('', [Validators.required,Validators.minLength(5)]);

  this.registerForm= new FormGroup({
    firstname:this.firstname,
    lastname:this.lastname,
    username:this.username,
    email:this.email,
    password: this.password
  })
}

  add():void {
    let app = this.registerForm.value as App;
    console.log(JSON.stringify(app))
    this.appService.add(app)
    .subscribe(response => {
    console.log(response);
    this.router.navigate(['/Login']);
    this.toastr.success('Register successfully!');
    })  
  }

}
