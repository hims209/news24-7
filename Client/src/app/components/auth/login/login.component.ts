import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { tokenExpired } from 'src/app/utils/tokenExpired';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: any = {};
  result: any = [];
  errorMsg: String = '';

  constructor(private router: Router, private authService: AuthService) {}

  //It will do login validation by using authService and redirecting routes to user or admin by
  //checking credentials.
  loginSubmit() {
    this.authService.login(this.login).subscribe((res) => {
      if (res.errorMsg != null) {
        this.errorMsg = res.errorMsg;
      } else {
        localStorage.setItem('token', res.token);
        const decodedToken: any = jwt_decode(res.token);
        this.authService.type.next(decodedToken.type);
        //If fetech token is the admin token then it will redirected to admin otherwise it will route to 
        //customer side.
        if (decodedToken.type == 'admin')
          this.router.navigate(['/manage-news']);
        
        else this.router.navigate(['/customerhome']);
      }
    });
  }
  ngOnInit(): void {}
}
