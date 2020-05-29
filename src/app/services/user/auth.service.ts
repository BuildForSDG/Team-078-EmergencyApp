import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { resolve } from "url";

@Injectable({
  providedIn: "root"
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
      console.log("Signed in as:", firebaseUser.user.uid);
    },
    error => {
      console.error("Authentication failed:", error);
    });
  }

  checkVictimAccount(victim) : Promise<any> {
    var doc = firebase.firestore().doc(`victims/${victim}`);
    return	new	Promise((resolve,	reject)	=>	{
      doc.get().then((docu) => {
        //this user is already registered as a victim
        if(docu.exists) {
            reject("Victim Exists") ;
        }else{
          //this document does not exists meaning this victim has not been previously registered 
          resolve(true);
        }
      }, (err) => {
        console.log("Error getting document:", err);
        reject(err);
      });
    });
  }

  addResponder(
    email: string,
    password: string,
    phone_number: string,
    address: string,
    respondant_type: string,
    respondant_unit: string,
    coordinates: any,
    formatted_address: string
  ): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
           firebase
          .firestore()
          .doc(`/responder/${newUserCredential.user.uid}`)
          .set({
            email: email,
            password: password,
            phone_number: phone_number,
            address: address,
            respondant_type: respondant_type,
            respondant_unit: respondant_unit,
            location: coordinates,
            formatted_address: formatted_address
          })
          .then(function() {
            return true;
          })
          .catch(function(error) {
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
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            email: email,
            notifications_frquency: 3
          });
      })
      .catch(error => {
        console.error(error);
        //alert(error.message);
        throw new Error(error);
      });
  }
  
  addRequest(victim_id:string, request_ref:string, request_type:string, 
    request_lat: number, request_long:number,request_address: string, 
    respond_rating: string,responder_email:string, victim_number:string, formatted_address:string ):Promise<any>{
    return  firebase
    .firestore()
    .collection('request')
    .add({
      victim_id: victim_id,
      request_ref: request_ref,
      request_type: request_type,
      request_time: firebase.firestore.FieldValue.serverTimestamp(),
      request_lat: request_lat,
      request_long:request_long,
      request_address : request_address,
      respond_rating: respond_rating,
      responder_email: responder_email,
      victim_number: victim_number,
      request_resolved: false,
      assigned_responders: [],
      responded_responder: '',
      //this is the address passed in from geocoding
      formatted_address : formatted_address
    });
  }

  addDanger(dangerType: string, description: string, lng: number, lat: number) {
    let location = {
      lat: lat,
      lng: lng
    };
    return  firebase
    .firestore()
    .collection('road_danger')
    .add({
      dangerType: dangerType,
      description: description,
      location: location,
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
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            email: email,
            notifications_frquency: 3
          });
        alert("Registration Successful");
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  facebookSignIn(): Promise<void> {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    return firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          //var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function(error) {
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

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
