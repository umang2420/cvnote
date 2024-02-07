// user-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  userData(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  getUserData(): Observable<any> {
    return this.http.get(this.url);
  }
  }