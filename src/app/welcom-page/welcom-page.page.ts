import { Component, OnInit } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications, Storage } = Plugins;

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcom-page',
  templateUrl: './welcom-page.page.html',
  styleUrls: ['./welcom-page.page.scss'],
})
export class WelcomPagePage implements OnInit {

  constructor(public platform: Platform) {
    //get the pushToken here..
    //of course check platform first
    if(this.platform.is('android') || this.platform.is('ios')){
      PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
          alert("Push notification error");
        }
      });
  
      PushNotifications.addListener('registration',
          async (token: PushNotificationToken) => {
            //alert('Push registration success, token: ' + token.value);
            await Storage.set({
              key: 'pushToken',
              value: token.value
            });
          }
      );
  
      PushNotifications.addListener('registrationError',
          (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
          }
      );
  
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          //alert('Push received: ' + JSON.stringify(notification));
        }
      );
  
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          //alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }
  }

  ngOnInit() {
    
  }

}
