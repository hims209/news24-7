import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  //It will use uthservice and clear the storage and route to the login page after the logout.
  ngOnInit(): void {
    this.authService.type.next(null);
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
