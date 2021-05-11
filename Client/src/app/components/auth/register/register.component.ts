import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  register: any = {};
  newUser: any = {};
  errorFromServer: String = '';
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }
  //It will redirect to the login Component
  login() {
    this.modalService.dismissAll();
    //routes not implemented yet
    this.router.navigate(['/login']);
  }

  ngOnInit(): void { }

  //by using authService it will register the user.
  registerSubmit(successModal, errorModal, f) {
    this.authService.register(this.register).subscribe((res) => {
      if (res.errorMsg != null) {
        this.errorFromServer = res.errorMsg;
        this.modalService.open(errorModal, {
          ariaLabelledBy: 'modal-basic-title',
        });
      } else {
        this.errorFromServer = '';
        f.submitted = false;
        this.newUser = res.user;
        this.modalService.open(successModal, {
          ariaLabelledBy: 'modal-basic-title',
        });
      }
    });
  }
}
