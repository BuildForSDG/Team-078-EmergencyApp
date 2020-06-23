import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { firebaseConfig } from './credentials';
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform
  ) {
    let userCoordinates = {
      coords: {
        latitude: 0,
        longitude: 0
      }
    }
    localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
    if (localStorage.getItem('userCoordinates')) {
      console.log("Found",JSON.parse(localStorage.getItem('userCoordinates')));
    }else{
      localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
      console.log("In if",userCoordinates);
    }

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig);

  }

}
