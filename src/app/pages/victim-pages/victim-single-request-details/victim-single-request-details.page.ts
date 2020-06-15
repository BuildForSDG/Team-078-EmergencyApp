import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { RespondentViewRequestOnMapPage } from '../../respondant-pages/respondent-view-request-on-map/respondent-view-request-on-map.page';
import { VictimReviewPagePage } from '../victim-review-page/victim-review-page.page';

@Component({
  selector: 'app-victim-single-request-details',
  templateUrl: './victim-single-request-details.page.html',
  styleUrls: ['./victim-single-request-details.page.scss'],
})
export class VictimSingleRequestDetailsPage implements OnInit {

  phone_number: string;
  time: any;
  location: any;
  coord: any;
  id: any;
  responded: boolean = false;
  allresponders: any;
  responded_responder: any;
  allresponders_data: any = [];
  request_status: any = false;
  public loading: any;

  async ngOnInit() {
  }
  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    firebase.auth().onAuthStateChanged(async user => {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      if (user) {
        //fetch the request
        firebase.firestore().doc(`request/${this.id}`)
          .onSnapshot(result1 => {
            //console.log(result.data());
            var that = this;
            // if (result1.data().responded_responder != "") {
            this.responded = true;
            this.allresponders = result1.data().assigned_responders;
            this.request_status = result1.data().request_resolved;
            console.log("Responders: ", this.allresponders);

            this.allresponders.forEach((data) => {
              firebase.firestore().doc(`responder/${data}`)
                .get().
                then((result) => {
                  //here we get the profile of the responder
                  let res_data = {
                    id: data,
                    phone_number: result.data().phoneNumber,
                    address: result.data().address,
                    email: result.data().email,
                    fullname: result.data().fullname,
                    respondentUnit: result.data().respondantUnit,
                    responded_responder: result1.data().responded_responder
                  }
                  that.allresponders_data.push(res_data);
                  that.loading.dismiss();
                },
                  error => {
                    that.loading.dismiss().then(async () => {
                      const alert = await that.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: 'Ok', role: 'cancel' }]
                      });
                      await alert.present();
                    });
                    console.log(error);
                  });//end profile query
            });
            // } else {
            //   that.loading.dismiss();
            //   this.responded = false
            // }
          }, error => {
            console.log(error);
          })
      }

    });
  }
  //open model for review
  async openModal() {
    const modal = await this.modalController.create({
      component: VictimReviewPagePage,
      componentProps: {
        request_id: this.id
      }
    });

    modal.onDidDismiss().then(res => {
      if (res !== null) {
        // console.log('The result:', res.data.responded);
        //this updates the request status after the user successfully completed the review
        if (res.data.responded) {
          this.request_status = true;
        }
      } else {
        console.log("No result:", res);
      }
    });

    return await modal.present();
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

}
