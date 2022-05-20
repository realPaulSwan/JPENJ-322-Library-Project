import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},  // this sets the default page to 'login' when doing ng serve -o
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manage-books', component: ManageBooksComponent},
  {path: 'user-management', component: UserManagmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
