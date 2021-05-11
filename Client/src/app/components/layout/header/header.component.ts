import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  type;
  constructor(private authService: AuthService) {}

  //Here it will check the user is customer or the admin.
  ngOnInit(): void {
    this.authService.type.subscribe((res) => (this.type = res));
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.authService.type.next(decodedToken.type);
    }
  }
}
