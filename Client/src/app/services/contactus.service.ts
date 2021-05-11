import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailServiceService {

  constructor(private http: HttpClient) { }



  sendEmail(obj:any): Observable<any> {
    console.log("sendEmail Obj",obj)
    return this.http.post<any>('http://localhost:9000/api/v1/news/sendFormData', obj)
  }
}