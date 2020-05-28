import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user: firebase.User) => {
          if (user) {
              this.router.navigate(['/home']);
              resolve(false);
          } else {
            resolve(true);
          }
        });
      });

  }
}
