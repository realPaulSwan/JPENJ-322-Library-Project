import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HeroService} from "../heroes/hero.service";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  studentsList:any = []
  librarianList:any = []
  students = [
    {first_name:"", last_name: ""}
  ]
  librarians = [ 
    {first_name:"", last_name:""}
  ]

  constructor(private router: Router, private service: HeroService) {
    //this.getStudents();
    //this.getLibrarians();
  }


  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }

  updateStudentStatus(){
  }

  getDataFromAPI(){
    this.service.getUsers().subscribe(( response) => {
      console.log('API Response is',response);
      this.studentsList = response
    }, (error) => {
      console.log('Error is',error);
      }
    )
  }
  getLibrarianDataFromAPI(){
    this.service.getLibrarians().subscribe(( response) => {
      console.log('API Response is',response);
      this.librarianList = response
    }, (error) => {
      console.log('Error is',error);
      }
    )
  }

  pushNewStudent(first_name: string, last_name: string) {
    //TODO: Get student first and last name 
 
    this.getDataFromAPI()
    this.getLibrarianDataFromAPI() 
 
    setTimeout(             //Set a time out period to allow the data to return
      () => {
        var x = this.librarianList.length + this.studentsList.length + 1
        var lenVal = x / 10;
        var idNum = ""

        if (lenVal >= 0 && lenVal <= 0.9) {idNum = '00000000' + x;}
        else if (lenVal >= 1 && lenVal <= 9.9) {idNum = '0000000' + x;}
        else if (lenVal >= 10 && lenVal <= 99.9) {idNum = '000000' + x;}
        else if (lenVal >= 100 && lenVal <= 999.9) {idNum = '00000' + x;}
        else if (lenVal >= 1000 && lenVal <= 9999.9) {idNum = '0000' + x;}
        else if (lenVal >= 10000 && lenVal <= 99999.9) {idNum = '000' + x;}
        else if (lenVal >= 100000 && lenVal <= 999999.9) {idNum = '00' + x;}
        else if (lenVal >= 1000000 && lenVal <= 9999999.9) {idNum = x;}


        this.service.postNewStudent(idNum,first_name,last_name);
      },
      500 // the time to sleep to delay for
    );
  }

  pushNewLibrarian(first_name: string, last_name: string, u_name: string, password: string) {
        //TODO: Get librarian first and last name, as well as username and password
 
        
        this.getDataFromAPI()
        this.getLibrarianDataFromAPI() 
     
        setTimeout(             //Set a time out period to allow the data to return
          () => {
            var x = this.librarianList.length + this.studentsList.length + 1
            var lenVal = x / 10;
            var idNum = ""
    
            if (lenVal >= 0 && lenVal <= 0.9) {idNum = '00000000' + x;}
            else if (lenVal >= 1 && lenVal <= 9.9) {idNum = '0000000' + x;}
            else if (lenVal >= 10 && lenVal <= 99.9) {idNum = '000000' + x;}
            else if (lenVal >= 100 && lenVal <= 999.9) {idNum = '00000' + x;}
            else if (lenVal >= 1000 && lenVal <= 9999.9) {idNum = '0000' + x;}
            else if (lenVal >= 10000 && lenVal <= 99999.9) {idNum = '000' + x;}
            else if (lenVal >= 100000 && lenVal <= 999999.9) {idNum = '00' + x;}
            else if (lenVal >= 1000000 && lenVal <= 9999999.9) {idNum = x;}
    
    
            this.service.postNewLibrarian(idNum,first_name,last_name,u_name,password);
          },
          500 // the time to sleep to delay for
        );
  }

  getStudents(){
    this.getDataFromAPI();  //Get the data from PSQL
    setTimeout(             //Set a time out period to allow the data to return
      () => {
        var y = this.students.length  //clear all previous search
        for (var z = 0; z < y; z++) {
          this.students.pop()
        }
        for (var x in this.studentsList) {  //Push new librarian onto librarian list
          this.students.push({first_name: this.studentsList[x]['first_name'], last_name: this.studentsList[x]['last_name']})
        }
        console.log("student search complete");
      },
      500 // the time to sleep to delay for
  );
  }

  getLibrarians(){
    this.getLibrarianDataFromAPI();  //Get the data from PSQL
    setTimeout(             //Set a time out period to allow the data to return
      () => {
        // TODO: IMPLENENT THIS
        var y = this.librarians.length  //clear all previous search
        for (var z = 0; z < y; z++) {
          this.librarians.pop()
        }
        for (var x in this.librarianList) {  //Push new librarian onto librarian list
          this.librarians.push({first_name: this.librarianList[x]['first_name'], last_name: this.librarianList[x]['last_name']})
        }
        console.log("librarian search complete");
      },
      500 // the time to sleep to delay for
  );
  }
}