import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule }                     from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient }                 from '@angular/common/http';
import { HttpModule }                       from '@angular/http';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppService } from './app.service';
import { EditComponent } from './datagrids/edit/edit.component';
import { UserComponent } from './datagrids/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BlockcopypasteDirective } from './Directives/blockcopypaste.directive';


@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent, 
    LoginComponent, HeaderComponent, BlockcopypasteDirective,PageNotFoundComponent,FooterComponent, RegistrationComponent,EditComponent,UserComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,NgxPaginationModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-center',
      preventDuplicates:true
    }),
    FormsModule, ReactiveFormsModule,HttpClientModule,
    HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }