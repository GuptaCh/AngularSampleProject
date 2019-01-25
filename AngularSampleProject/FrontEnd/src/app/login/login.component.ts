// import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '../app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register:any[];
  errorMessage:any;
  LoginForm:FormGroup;
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
    this.email = new FormControl('', [Validators.required,Validators.email]);
    this.password = new FormControl('', Validators.required);

  this.LoginForm= new FormGroup({
    email:this.email,
    password: this.password
  })
}

loginUser()
     {
      let model=this.LoginForm.value;
      this.appService.login(model)
      .subscribe(response => { 
        if (response)
        {          
          this.toastr.success('Login successfully!');
          this.router.navigate(['/User']);
        }
        });
     }


}
