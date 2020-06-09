import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-view-emergencies',
  templateUrl: './view-emergencies.page.html',
  styleUrls: ['./view-emergencies.page.scss'],
})
export class ViewEmergenciesPage implements OnInit {
  emergencies: any = [];
  public loading: any;
  public Response: string;

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
  }

  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    //get a list of all emergencie sassigned to this particular responder
    firebase.auth().onAuthStateChanged(async user => {
      // this.loading = await this.loadingCtrl.create();
      //   await this.loading.present();
      if (user) {
        //user is active
        firebase.firestore().doc(`responder/${user.uid}`).get().then(result => {
          //here we get the profile of the responder
          var profile_id = result.id;
          //get all the unresolved emergencies that belong to this responder
          //this is done by looking in the requests table for assigned responders
          firebase.firestore().collection('request').where('assigned_responders', 'array-contains', profile_id)
            //.where('request_type', '==', result.data().respondant_type)
            .where('request_resolved', '==', false).orderBy('request_time', 'desc')
            //we use onsnapshot to check in realtime for changes in data.
            .onSnapshot(res => {
              //set emergencies to an empty array so that it is empty for each snapshot
              this.emergencies = [];
              res.forEach(doc => {
                let data = {
                  id: doc.id,
                  phone_number: doc.data().victim_number,
                  time: new Date(doc.data().request_time.seconds * 1000).toLocaleString(),
                  location: doc.data().request_address,
                  coord: {
                    lat: doc.data().request_lat,
                    lng: doc.data().request_long
                  }
                }
                this.emergencies.push(data);
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
            });//end assigned responders query
        }, error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
          console.log(error);
        });//end profile query
      }
    });
  }

  async openModal(id) {
    const request = this.emergencies.find(element => element.id === id);
    const modal = await this.modalController.create({
      component: EmergencyDetailsPage,
      componentProps: {
        id: request.id,
        phone_number: request.phone_number,
        time: request.time,
        location: request.location,
        coord: request.coord
      }
    });
    // return response from modal 
    modal.onWillDismiss().then(dataReturned => {
      this.Response = dataReturned.data;
    });

    return await modal.present();
  }

}

