import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tokenExpired } from '../utils/tokenExpired';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})

// this module is check the token from the localstorage For the admin and check it if it is valid or not
// if it is expire then it will redirect to the logout page.
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.token;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (tokenExpired(token)) {
        this.router.navigate(['/logout']);
        return false;
      } else if (decodedToken.type == 'admin') {
        return true;
      } else {
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
