import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBook } from './Book';
@Injectable({
providedIn: 'root'
})
export class BookAPIService {
constructor(private _http: HttpClient) { }
getBooks():Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.get<any>("/books",requestOptions).pipe(
map(res=>JSON.parse(res) as Array<IBook>),
retry(3),
catchError(this.handleError))
}
handleError(error:HttpErrorResponse){
return throwError(()=>new Error(error.message))
}
getBook(bookId:string):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("/books/"+bookId,requestOptions).pipe(
  map(res=>JSON.parse(res) as IBook),
  retry(3),
  catchError(this.handleError))
  }
  postBook(aBook:any):Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.post<any>("/books",JSON.stringify(aBook),requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<IBook>),
  retry(3),
  catchError(this.handleError))
  }
  }
  
