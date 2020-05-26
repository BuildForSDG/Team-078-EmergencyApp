import { Component, OnInit } from '@angular/core';
import {LoadingController, AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.page.html',
  styleUrls: ['./user-welcome.page.scss'],
})
export class UserWelcomePage implements OnInit {

  public loading: HTMLIonLoadingElement;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _auth: AuthService) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // user is active
        this.checkVictimAccount(user.uid);
      }else{
        // there is no user, perform anonymous login anyway
        this.doAnonLogin();
      }
    });

   }

  ngOnInit() {
  }

  // this function is useful for checkin if there is a user and if that user has been previously registered as a victim
  // this is important if a user that was previously registered as a respondant were to enter the application as a victim
  async checkVictimAccount(victim){
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this._auth.checkVictimAccount(victim).then( () => {
      this.loading.dismiss().then(() => {
        this._auth.anonymousLogin();
      });
    }, error => {
      this.loading.dismiss().then( () => {

      });
    });
  }

  // this function performs anonymous login for a user that never existed
  async doAnonLogin(){
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this._auth.anonymousLogin().then( () => {
      this.loading.dismiss().then(() => {

      });
    }, error => {
      this.loading.dismiss().then( () => {

      });
    });
  }

}
