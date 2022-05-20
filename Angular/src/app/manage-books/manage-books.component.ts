import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HeroService} from "../heroes/hero.service";

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  bookList:any = []

  constructor(private router: Router, private service: HeroService) { }

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }

  getDataFromAPI(){
    this.service.getBooks().subscribe(( response) => {
      console.log('API Response is',response);
      this.bookList = response
    }, (error) => {
      console.log('Error is',error);
      }
    )
  }

  pushNewBook(title:string, author:string, genre:string, desc:string) {
    //TODO: Get book data 
 
    this.getDataFromAPI()
 
    setTimeout(             //Set a time out period to allow the data to return
      () => {
        var x = this.bookList.length + 11
        var lenVal = x / 10;
        var idNum = ""

        if (lenVal >= 0 && lenVal <= 0.9) {idNum = '11111111' + x;}
        else if (lenVal >= 1 && lenVal <= 9.9) {idNum = '1111111' + x;}
        else if (lenVal >= 10 && lenVal <= 99.9) {idNum = '111111' + x;}
        else if (lenVal >= 100 && lenVal <= 999.9) {idNum = '11111' + x;}
        else if (lenVal >= 1000 && lenVal <= 9999.9) {idNum = '1111' + x;}
        else if (lenVal >= 10000 && lenVal <= 99999.9) {idNum = '111' + x;}
        else if (lenVal >= 100000 && lenVal <= 999999.9) {idNum = '11' + x;}
        else if (lenVal >= 1000000 && lenVal <= 9999999.9) {idNum = x;}

        this.service.postNewBook(idNum,title,author,genre,desc);
      },
      500 // the time to sleep to delay for
    );
  }
}
