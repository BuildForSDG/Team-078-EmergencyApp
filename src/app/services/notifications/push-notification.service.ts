import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { 
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        alert("Push notification error");
      }
    });

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
  
  //this function saves the token to local storage
  async saveToken(){
    return new Promise((resolve, reject) => {
      PushNotifications.addListener('registration',
        async (token: PushNotificationToken) => {
          alert('Push registration success, token: ' + token.value);
          await Storage.set({
            key: 'pushToken',
            value: token.value
          });
          resolve(token.value);
        }
      );
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
          reject(error);
        }
      );
    });
  }

}
