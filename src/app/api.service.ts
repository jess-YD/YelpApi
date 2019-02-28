import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json",
    "Authorization" : "Bearer -xlC4QM1sDzzeDXoytjC8emEsOg_izA2xMgwO5EWk0OVa8OIukgoq0cdCa5gl4SINjPjUwHaO2aaUYV_f6Qlo0krXtcc3uB-MmCc2RQsGfTv3vwTn_wxuYDhlmh3XHYx"
  })
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private baseURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?open_now=true&location=";
  private handleError<T> (operation = "operation", result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

    constructor(private http: HttpClient) { }

    sendFetchService(input: string): any {
      //console.log("Service", input);
      return this.http.get(`${this.baseURL}${input}`, httpOptions).pipe(
        catchError(this.handleError("sendFetchService")),
        tap(data => {
          return data
        })
      )
    }
    }
  

  
