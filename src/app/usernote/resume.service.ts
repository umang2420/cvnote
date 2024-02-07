import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private url = "http://localhost:3000/CvNote";

  constructor(private http: HttpClient) { }

  userNote(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
  getCvNote(): Observable<any []> {
    return this.http.get<any []>(this.url);
  }
  updateNotes(userId: string, data: any): Observable<any> {
    return this.http.put(this.url + '/' + userId, data);
  }  
}

