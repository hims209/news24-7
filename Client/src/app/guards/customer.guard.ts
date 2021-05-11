import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { tokenExpired } from '../utils/tokenExpired';
@Injectable({
  providedIn: 'root',
})
// this module is check the token from the localstorage For the customer and check it if it is valid or not
// if it is expire then it will redirect to the logout page.
export class CustomerGuard implements CanActivate {
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
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
