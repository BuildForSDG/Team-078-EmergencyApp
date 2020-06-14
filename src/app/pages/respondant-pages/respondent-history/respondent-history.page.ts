import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { RespondentSingleRequestDetailPage } from '../respondent-single-request-detail/respondent-single-request-detail.page';

@Component({
  selector: 'app-respondent-history',
  templateUrl: './respondent-history.page.html',
  styleUrls: ['./respondent-history.page.scss'],
})
export class RespondentHistoryPage implements OnInit {

  
  requests: any = [];
  public loading: any;
  public Response: string;

  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    
    firebase.auth().onAuthStateChanged(async user => {
      this.loading = await this.loadingCtrl.create();
        await this.loading.present();
       //user is active
      if (user) {
        //fetch all request assigned to this user
        firebase.firestore().collection('request')
          .where('responded_responder', '==', user.uid)
          .get().
          then(result => {
            //iterate through each request
            result.forEach(doc => {
              let data = {
                id: doc.id,
                phone_number: doc.data().victim_number,
                time: new Date(doc.data().request_time.seconds * 1000).toLocaleString(),
                location: doc.data().request_address,
                coord: {
                  lat: doc.data().request_lat,
                  lng: doc.data().request_long
                },
                request_type: doc.data().request_type,
                request_resolved: doc.data().request_resolved
              }
              this.requests.push(data);
              
            });
            this.loading.dismiss();
          }, (error) => {
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
  ngOnInit() {
  }

  async openModal(id) {
    const request = this.requests.find(element => element.id === id);
    const modal = await this.modalController.create({
      component: RespondentSingleRequestDetailPage,
      componentProps: {
        id: request.id,
        phone_number: request.phone_number,
        time: request.time,
        location: request.location,
        responded_responder: request.responded_responder,
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
