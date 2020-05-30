import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { async } from '@angular/core/testing';
import { AuthService } from '../../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.page.html',
  styleUrls: ['./get-help.page.scss'],
})

export class GetHelpPage implements OnInit {
  
  userInfo = {
    emmergency: '',
    address: '',
    phone_number:'',
    victim_id : ''
  };
  public loading: HTMLIonLoadingElement;
  emergencies = [];
  constructor(private router: Router, private _auth: AuthService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { 
      _auth.getUnitType().then(async (result) => {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.emergencies = await result;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    })
    firebase.auth().onAuthStateChanged(user => { 
      if (user) { 
        //user is active
        this.userInfo.victim_id = user.uid;
      }else{
        //there is no user, perform anonymous login 
        //we leave this part bllank for now because
        //anonymous ogin would have been performed on the user-welcome page
        //before ever getting here
       
      }
    });
  }

  ngOnInit() {

  }

  async submitForm() {
    //Sending the details submited to verify location page.
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    if (this.userInfo.emmergency !== '' && this.userInfo.address !== '' && this.userInfo.phone_number !== '') {
      const navigationExtras: NavigationExtras = {
        state: {
          userInfo: this.userInfo
        }
      };
      this.loading.dismiss().then(() => {
        this.router.navigate(['/victim-confirm-loc-on-map'], navigationExtras);
      });
      
    } else {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: "All fields are required", buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    }
  }

}
