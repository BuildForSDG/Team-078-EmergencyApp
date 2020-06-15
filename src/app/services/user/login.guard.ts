import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
              //check if this a legit respondent
              var doc = firebase.firestore().doc(`responder/${user.uid}`);
              doc.get().then((docu) => {
                // this user is a legit respondent
                if (docu.exists) {
                  this.router.navigate(['/respondant-dashboard']);
                  resolve(false);
                } else {
                  // this document does not exist meaning this is not a legit respondent
                  resolve(true);
                  ///console.log("User Not found");
                }
              }, (err) => {
                console.log('Error getting document:', err);
                resolve(true);
              });  
          } else {
            resolve(true);
          }
        });
      });

  }
}
