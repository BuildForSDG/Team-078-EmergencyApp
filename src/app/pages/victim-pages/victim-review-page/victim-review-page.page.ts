import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-victim-review-page',
  templateUrl: './victim-review-page.page.html',
  styleUrls: ['./victim-review-page.page.scss'],
})
export class VictimReviewPagePage implements OnInit {
  reviewDetails = {
    name: "",
    rate: "",
    comment: ""
  }
  reviewed : any = false;
  public loading: HTMLIonLoadingElement;
  request_id: any;
  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async submitReview() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    if (this.reviewDetails.name !== "" &&
       this.reviewDetails.rate !== "" &&
       this.reviewDetails.comment !== "") {
     // var that = this;
      firebase.firestore().doc(`request/${this.request_id}`).update({
        //we updated the details from firestore here
        request_resolved: true,
        respond_rating: this.reviewDetails.rate,
      }).then(() => {
        firebase.firestore().doc(`request/${this.request_id}`).collection("review").doc().set({
          name: this.reviewDetails.name,
          rate: this.reviewDetails.rate,
          comment: this.reviewDetails.comment
        }).then(() => {
          this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({ message: "Thanks for rating respondents, your response will be used tot improve our services", buttons: [{ text: 'Ok', role: 'cancel' }], });
          await alert.present();
          this.reviewed = true;
          this.closeModal();
          });
        }).catch((error) => {
          console.log("Error", error);
        });
      }).catch((error) => {
        console.log(error);
      });
    }else{
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: "All fields are required", buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    }
  }
  async closeModal() {
   // await this.modalController.dismiss();
   await this.modalController.dismiss({
      'dismissed': true,
      'responded' : this.reviewed ,
    });
  }

}
