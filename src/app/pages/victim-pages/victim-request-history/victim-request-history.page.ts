import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { VictimSingleRequestDetailsPage } from '../victim-single-request-details/victim-single-request-details.page';

@Component({
  selector: 'app-victim-request-history',
  templateUrl: './victim-request-history.page.html',
  styleUrls: ['./victim-request-history.page.scss'],
})
export class VictimRequestHistoryPage implements OnInit {

  requests: any = [];
  public loading: any;
  public Response: string;

  async ngOnInit() {

  }

  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    
    //get a list of all emergencie sassigned to this particular responder
    firebase.auth().onAuthStateChanged(async user => {
      this.loading = await this.loadingCtrl.create();
        await this.loading.present();

      if (user) {
        //user is active
        firebase.firestore().collection('request')
          .where('victim_id', '==', user.uid)
          .get().
          then(result => {
            //here we get the profile of the responder
            result.forEach(doc => {
              let data = {
                id: doc.id,
                phone_number: doc.data().victim_number,
                assigned_responders: doc.data().assigned_responder,
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
  async openModal(id) {
    const request = this.requests.find(element => element.id === id);
    const modal = await this.modalController.create({
      component: VictimSingleRequestDetailsPage,
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
