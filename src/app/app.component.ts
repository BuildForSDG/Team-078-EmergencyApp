import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app' ;
import { firebaseConfig } from './credentials' ;
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
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig);

  }

}
