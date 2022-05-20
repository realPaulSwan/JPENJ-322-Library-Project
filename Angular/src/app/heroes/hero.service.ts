import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
//import {Http, Headers} from '@angular/http';
//TEST COMMENT
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) {


  }
  //const // @ts-ignore
 // let headers = new HttpHeaders()
 //   .set('content-type', 'application/json')
 //   .set('Access-Control-Allow-Origin', '*');




  getBooks(){
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get('http://localhost:3000/books')
    //return this.http.header('Access-Control-Allow-Origin','*');
  }
  delID(){
    return this.http.get('http://localhost:8080/uptest')
  }
  getLibrarian(){
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get('http://localhost:3000/library_authenticate')
    //return this.http.header('Access-Control-Allow-Origin','*');
  }
  getUsers(){
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get('http://localhost:3000/users')
    //return this.http.header('Access-Control-Allow-Origin','*');
  }
  getLibrarians() {
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.get('http://localhost:3000/librarians')
    //return this.http.header('Access-Control-Allow-Origin','*');
  }

  postNewStudent(id:string, fname:string, lname:string) {
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Expose-Headers': '*'
    });
    const data = {user_id: id, first_name: fname, last_name: lname}
    return this.http.post('http://localhost:3000/insert_student',data).subscribe(

      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);
      }
    );
    //console.log();
  }

  
  postNewLibrarian(id:string, fname:string, lname:string, uname:string, psw:string) {
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Expose-Headers': '*'
    });
    const data = {user_id: id, first_name: fname, last_name: lname, username: uname, user_password: psw}
    return this.http.post('http://localhost:3000/api/insert_librarian',data).subscribe(

      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);
      }
    );
    //console.log();
  }
  postNewBook(id:string, title:string, author:string, genre:string, book_desc:string) {
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Expose-Headers': '*'
    });
    const data = {book_id: id, title: title, author: author, genre: genre, book_desc: book_desc}
    return this.http.post('http://localhost:3000/api/insert_book',data).subscribe(

      data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);
      }
    );
    //console.log();
  }


}

