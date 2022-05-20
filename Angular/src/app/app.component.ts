import {Component, OnInit} from '@angular/core';
import {HeroService} from "./heroes/hero.service";

import{Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular';
  libList:any = []

// constructor(private router:Router) {}

  constructor(private service : HeroService, private router:Router) {
  }
  goToPage(pageName:string): void { 
    this.router.navigate([`${pageName}`]); 
  }

  ngOnInit(){



  } 

  getDataFromAPI(){
    this.service.getBooks().subscribe(( response) => {
      console.log('API Response is',response);
    }, (error) => {
      console.log('Error is',error);
      }
    )
  }

  getLib(){
    this.service.getLibrarian().subscribe(( response) => {
      console.log('API Response is',response);
      this.libList = response;
    }, (error) => {
      console.log('Error is',error);
      }
    )
  }

  onSubmit() {
    this.getDataFromAPI();
    alert('Thanks!');
  }

  onSubmit_2() {
    this.service.delID();
    alert('Thanks!');
  }

  //This function is the authentication function
  libAuth(uname:string, psw:string) {
    var librarians:any[] = [] //Create empty librarians
    this.getLib();            //Set it to 
    setTimeout(                         //Set a time out period to allow the data to return
      () => {
        librarians = this.libList;//the return from the database

        console.log('Librarians in ',librarians); //Print to check
        
        //Loops through each librarian
        for (var x in librarians) {
           if (librarians[x]['username'] == uname && librarians[x]['user_password'] == psw) {
               console.log("USER IS AUTHENTICATED!!!!!!");
               //Route to homepage
          }
        }
      },
      1000 // the time to sleep to delay for
  );
  }

}
