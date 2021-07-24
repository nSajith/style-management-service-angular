import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StyleServiceService {
  path: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'content-type': 'application/json'
    })
  };
  createStyle(style) : Observable<any>{
    console.log("create", style);
    return this.http.post(this.path + '/style/create', style,  this.httpOptions);
  }

  getStyle(id) {
    console.log("get style", id);
    return this.http.get(this.path + '/locations/' + id);
  }

  getStyleDetails(id) {
    console.log("style details", id);
    return this.http.get(this.path + '/style-detail/get-by-style-id/' + id);
  }
  
  createStyleDetails(style, result): Observable<any> {
    console.log("createStyleDetails", style);
    return this.http.post(this.path + '/style-detail/create/' + result.id, style)
    .pipe(
      retry(1),
      catchError(e => {
        alert("Error Thrown :"+e.message)
        return throwError(e);
        })
      );
  }

  handleError(error: HttpErrorResponse){
    alert("Error Thrown :"+error.message)
    return throwError(error);
    }

  getCategories() {
    return this.http.get(this.path + '/style-detail/category/get');
  }

  getItemByCategoryId(id) {
    return this.http.get(this.path + '/style-detail/get-by-category-id/' + id);
  }
}
