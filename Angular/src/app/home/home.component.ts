import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HeroService} from "../heroes/hero.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookList:any = []
  items = [
    {title: "", author: "", book_status: ""}
  ]

  constructor(private router:Router,private service : HeroService) { } // needed for routing
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

  searchBooks() {
    var n = document.getElementById("bookTable")!;  // hide the search table return table 
    this.getDataFromAPI();  //Get the data from PSQL
    setTimeout(             //Set a time out period to allow the data to return
      () => {
        n.hidden = false;         // make it not hidden
        var y = this.items.length  //clear all previous search
        for (var z = 0; z < y; z++) {
          this.items.pop()
        }
        for (var x in this.bookList) {  //Push new books onto book list
          this.items.push({title: this.bookList[x]['title'], author: this.bookList[x]['author'], book_status: this.bookList[x]['book_status']})
        }
        console.log("book search complete");
      },
      600 // the time to sleep to delay for
  );
  }

}

// export interface Item {
//   description: string;
//   done: boolean;
// }
