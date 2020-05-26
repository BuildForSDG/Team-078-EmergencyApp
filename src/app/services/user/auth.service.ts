import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  anonymousLogin() : Promise<any> {
    return firebase.auth().signInAnonymously().then(firebaseUser => {
      firebase.firestore().doc(`victims/${firebaseUser.user.uid}`).set({
        email: ''
      });
      console.log('Signed in as:', firebaseUser.user.uid);
    },
    error => {
      console.error('Authentication failed:', error);
    });
  }

  checkVictimAccount(victim) : Promise<any> {
    const doc = firebase.firestore().doc(`victims/${victim}`);
    return	new	Promise((resolve,	reject)	=>	{
      doc.get().then((docu) => {
        // this user is already registered as a victim
        if(docu.exists) {
            reject('Victim Exists') ;
        }else{
          // this document does not exists meaning this victim has not been previously registered
          resolve(true);
        }
      }, (err) => {
        console.log('Error getting document:', err);
        reject(err);
      });
    });
  }

  addResponder(
    email: string,
    password: string,
    phoneNumber: string,
    address: string,
    respondantType: string,
    respondantUnit: string,
    coordinates: any
  ): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
           firebase
          .firestore()
          .doc(`/responder/${newUserCredential.user.uid}`)
          .set({
            email,
            password,
            phoneNumber,
            address,
            respondantType,
            respondantUnit,
            location: coordinates
          })
          .then(() =>{
            return true;
          })
          .catch((error) => {
            throw new Error(error);
          });
      }, error => {
        throw new Error(error);
      });
  }

  create_new_user(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return true;
      })
      .catch(error => {
        return error.message;
      });
  }

  adminSignupUser(
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    password: string
  ): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/admin/${newUserCredential.user.uid}`)
          .set({
            firstname,
            lastname,
            phoneNumber,
            email,
            notifications_frquency: 3
          });
      })
      .catch(error => {
        console.error(error);
        // alert(error.message);
        throw new Error(error);
      });
  }

  addRequest(requestRef:string, requestType:string, requestLat: number,
     requestLong:number,requestAddress: string, respondRating: string,responderEmail:string, victimNumber:string ):Promise<any>{
    return  firebase
    .firestore()
    .collection('request')
    .add({
      requestRef,
      requestType,
      requestTime: firebase.firestore.FieldValue.serverTimestamp(),
      requestLat,
      requestLong,
      requestAddress,
      respondRating,
      responderEmail,
      victimNumber,
      requestResolved: false,
      assignedResponders: [],
      respondedResponder: ''
    });
  }

  addDanger(dangerType: string, description: string, lng: number, lat: number) {
    const location = {
      lat,
      lng
    };
    return  firebase
    .firestore()
    .collection('road_danger')
    .add({
      dangerType,
      description,
      location,
      request_time: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  signupUser(
    firstname: string,
    lastname: string,
    phone_number: string,
    email: string,
    password: string
  ): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/admin/${newUserCredential.user.uid}`)
          .set({
            firstname,
            lastname,
            phone_number,
            email,
            notifications_frquency: 3
          });
        alert('Registration Successful');
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  facebookSignIn(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    return firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
