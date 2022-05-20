import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HeroService} from "../heroes/hero.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  libList:any = []

  constructor(private router:Router,private service : HeroService) { } // needed for routing 
  goToPage(pageName:string): void { 
    this.router.navigate([`${pageName}`]); 
  }
  ngOnInit(): void {
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

    //This function is the authentication function
    libAuth(uname:string, psw:string) {
      const submitButton = document.getElementById("submitButton")!;
      const failedInput = document.getElementById("failtext")!;
      failedInput.hidden = true;
      var check = false;

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
                 check = true;
                 submitButton.hidden = false;
              }
          }
          if (check == false) {
            failedInput.hidden = false;
          }
        },
        500 // the time to sleep to delay for
    );
    }


}
