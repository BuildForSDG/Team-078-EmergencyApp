import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import {
  LoadingController,
  AlertController,
} from '@ionic/angular';
import "firebase/auth";
import "firebase/firestore";
@Component({
  selector: 'app-respondant-details',
  templateUrl: './respondant-details.page.html',
  styleUrls: ['./respondant-details.page.scss'],
})
export class RespondantDetailsPage implements OnInit {
  public readonly: boolean;
  public loading: any;
  public respondentConnect: any;
  public respondentDetails = {
    email: '',
    password: '',
    fullname: '',
    phone_number: '',
    address: '',
    respondant_unit: '',
    respondantType: '',
    verifiedAddress: ''

  }
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.readonly = true
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        //user is active
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        //assign the doc query to global scope so it can be re-used.
        const respondentInfo = firebase.firestore().doc(`responder/${user.uid}`);
        this.respondentConnect = respondentInfo;
        respondentInfo.get().then(result => {
          //here we get the profile of the responder
          var profile_id = result.id;
          console.log("Respondent Info: ", result.id);
          console.log("Info", result.data());
          var respondant = result.data();
          this.respondentDetails.email = respondant.email;
          this.respondentDetails.fullname = respondant.fullname;
          this.respondentDetails.phone_number = respondant.phoneNumber;
          this.respondentDetails.address = respondant.address;
          this.respondentDetails.respondant_unit = respondant.respondantUnit;
          this.respondentDetails.respondantType = respondant.respondantType;
          this.respondentDetails.verifiedAddress = respondant.formattedAddress;
          this.loading.dismiss();
        }, error => {
          console.log(error);
        });//end profile query
      }
    });
  }

  public async updateDetails() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.respondentConnect.update({
      //we updated the details from firestore here
      fullname : this.respondentDetails.fullname,
      phoneNumber : this.respondentDetails.phone_number,
      address : this.respondentDetails.address
    })
      .then(() => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({ message: "Details Successfully Update", buttons: [{ text: 'Ok', role: 'cancel' }], });
          await alert.present();
        });
      })
      .catch((error) => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
        });
      });
  }

}
