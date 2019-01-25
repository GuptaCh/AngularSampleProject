import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditComponent } from './datagrids/edit/edit.component';
import { UserComponent } from './datagrids/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path:  '', component:  HomeComponent },
  { path:  'Home', component:  HomeComponent },
  { path:  'Login', component:  LoginComponent },
  { path:  'Register', component:  RegistrationComponent },
  { path:  'User', component:  UserComponent },
  { path:  'Edit', component:  EditComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
