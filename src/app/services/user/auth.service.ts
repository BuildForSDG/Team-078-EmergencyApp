import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { resolve } from 'url';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public pushToken : any ;

  constructor(public platform: Platform) {
    //get the pushToken here..
    //of course check platform first
    //if(this.platform.is('android') || this.platform.is('ios')){
      this.getPushToken();
    //}
  }

  async getPushToken() {
    const { value } = await Storage.get({ key: 'pushToken' });
    this.pushToken = value ;
  }

  //fetch units by unit type
  getUnitsByUnitType(unitType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const unitsDetails = [];
      return firebase.firestore().collection('units')
        .where('unit_type', '==', unitType)
        .get().then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            unitsDetails.push(doc.data());
            resolve(unitsDetails);
          });
        }).catch((error) => {
          console.log("Error:" + error);
        });
    });
  }

  addUnit(unit_title: string, unit_type: string, address: string, phone_number: string, coordinates: any) {
    return firebase
      .firestore()
      .collection('units')
      .add({
        unit_title: unit_title,
        unit_type: unit_type,
        address: address,
        phone_number: phone_number,
        coordinates: coordinates,
        reg_date: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  getUnitType(): Promise<any> {
    return new Promise((resolve, reject) => {
      const units = [];
      firebase.firestore().collection("unit_types").get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          units.push(doc.data().name);
          resolve(units);
        });
      }).catch((error) => {
        console.log("Error:" + error);
      });
    });
  }

  getDangersLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      const units = [];
      firebase.firestore().collection("road_danger").get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          units.push(doc.data());
          //units.push(doc.data().location,doc.data().dangerType,doc.data().description);
          //console.log(units);
          resolve(units);
        });
      }).catch((error) => {
        //console.log("Error:" + error);
      });
    });
  }

  getUnit(): Promise<any> {
    return new Promise((resolve, reject) => {
      const units = [];
      firebase.firestore().collection("units").get().then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          units.push(doc.data().unit_title);
          resolve(units);
        });
      }).catch((error) => {
        console.log("Error:" + error);
      });
    });
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  anonymousLogin(): Promise<any> {
    return firebase.auth().signInAnonymously().then(firebaseUser => {
      firebase.firestore().doc(`victims/${firebaseUser.user.uid}`).set({
        email: '',
        pushToken : this.pushToken
      });
      console.log('Signed in as:', firebaseUser.user.uid);
    },
      error => {
        console.error('Authentication failed:', error);
      });
  }

  checkVictimAccount(victim): Promise<any> {
    const doc = firebase.firestore().doc(`victims/${victim}`);
    return new Promise((resolve, reject) => {
      doc.get().then((docu) => {
        // this user is already registered as a victim
        if (docu.exists) {
          reject('Victim Exists');
        } else {
          // this document does not exist meaning this victim has not been previously registered
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
    fullname: string,
    phoneNumber: string,
    address: string,
    respondantUnit: string,
    respondantType: string,
    coordinates: any,
    formattedAddress: string
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
            fullname,
            phoneNumber,
            address,
            respondantUnit,
            pushToken: '',
            respondantType,
            location: coordinates,
            formattedAddress
          })
          .then(() => {
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

  //store victims request to firebase
  addRequest(victim_id: string, request_ref: string, request_type: string,
    request_lat: number, request_long: number, request_address: string,
    respond_rating: string, responder_email: string, victim_number: string, formatted_address: string): Promise<any> {
    return firebase
      .firestore()
      .collection('request')
      .add({
        victim_id: victim_id,
        request_ref: request_ref,
        request_type: request_type,
        request_time: firebase.firestore.FieldValue.serverTimestamp(),
        request_lat: request_lat,
        request_long: request_long,
        request_address: request_address,
        respond_rating: respond_rating,
        responder_email: responder_email,
        victim_number: victim_number,
        request_resolved: false,
        assigned_responders: [],
        responded_responder: '',
        //this is the address passed in from geocoding
        formatted_address: formatted_address

      });
  }

  addDanger(dangerType: string, description: string, lng: number, lat: number) {
    const location = {
      lat,
      lng
    };
    return firebase
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

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
