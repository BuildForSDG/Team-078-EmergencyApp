import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> { 
    return firebase.auth().signInWithEmailAndPassword(email, password); 
  }

  signupUser(email: string, password: string): Promise<any> { 
    return firebase .auth() .createUserWithEmailAndPassword(email, password) 
    .then((newUserCredential: firebase.auth.UserCredential) => { 
      firebase .firestore() .doc(`/userProfile/${newUserCredential.user.uid}`) .set({ email: email, notifications_frquency : 3 }); 
    }) .catch(error => { 
      console.error(error); 
      throw new Error(error); 
    }); 
  }

  facebookSignIn(): Promise<void> {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    return firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  resetPassword(email:string): Promise<void> { 
    return firebase.auth().sendPasswordResetEmail(email); 
  }

  logoutUser():Promise<void> { 
    return firebase.auth().signOut(); 
  }

}
