import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //base api string
  api: string = 'http://localhost:9000/api/v1';

  type: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  //route to the login
  login(login: any): Observable<any> {
    return this.httpClient.post(this.api + '/auth/login', login);
  }

  //route to the register
  register(register: any): Observable<any> {
    return this.httpClient.post(this.api + '/users', register);
  }
}
