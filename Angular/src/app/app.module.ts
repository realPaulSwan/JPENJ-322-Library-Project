import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { DisplayBooksComponent } from './display-books/display-books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagmentComponent,
    AuthenticationComponent,
    ManageBooksComponent,
    DisplayBooksComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
