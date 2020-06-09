import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-view-respondant-list',
  templateUrl: './view-respondant-list.page.html',
  styleUrls: ['./view-respondant-list.page.scss'],
})
export class ViewRespondantListPage implements OnInit {

  respondents: any = [];
  public loading: any;
  public Response: string;

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    firebase.auth().onAuthStateChanged(async user => {
      // this.loading = await this.loadingCtrl.create();
      //   await this.loading.present();
      if (user) {
        this.respondents = [];
        firebase.firestore().collection('responder')
          .onSnapshot(res => {
            //set emergencies to an empty array so that it is empty for each snapshot
            res.forEach(doc => {
              let data = {
                id: doc.id,
                address: doc.data().address,
                email: doc.data().email,
                formattedAddress: doc.data().formattedAddress,
                location: doc.data().location,
                phoneNumber: doc.data().phoneNumber,
                respondentType: doc.data().respondantType,
                respondentUnit: doc.data().respondantUnit
              }
              this.respondents.push(data);
            })
            this.loading.dismiss();
            //console.log(this.emergencies);
          }, err => {
            this.loading.dismiss().then(async () => {
              const alert = await this.alertCtrl.create({
                message: err.message,
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              await alert.present();
            });
          });
      }
    });
  }

  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {


  }
  async deleteRespondent(respondent: string) {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
     //checks can also be made here to know if this responder have been assigned
     //a request before deleting, but we are deleting directly here.
    firebase.firestore().collection("responder").doc(respondent).delete().then(() =>{
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({
          message: "Respondent deleted successfully",
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        await alert.present();
        this.ngOnInit();
      });
    }).catch((error) => {
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

