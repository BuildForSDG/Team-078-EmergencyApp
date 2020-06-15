import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-respondent-single-request-detail',
  templateUrl: './respondent-single-request-detail.page.html',
  styleUrls: ['./respondent-single-request-detail.page.scss'],
})
export class RespondentSingleRequestDetailPage implements OnInit {
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
  isReviewed: any = false;
  review = {
     name : '',
     rate : '',
     comment : ''
  }
  public loading: any;

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
            // this.allresponders = result1.data().assigned_responders;
            // this.request_status = result1.data().request_resolved;
            // console.log("Responders: ", this.allresponders);
            if (result1.exists) {
              firebase.firestore().doc(`request/${this.id}/`).collection('review').limit(1).get().
                then(sub => {
                  if (sub.docs.length > 0) {
                    console.log('subcollection exists');
                    this.isReviewed = true;  
                    sub.forEach((result) =>{
                       console.log("Content" , result.data());
                        this.review.name = result.data().name;
                        this.review.rate = result.data().rate;
                        this.review.comment = result.data().comment;
                    });
                    that.request_status = true;
                    that.loading.dismiss()
                  }else{
                    that.loading.dismiss().then(async () => {
                                const alert = await that.alertCtrl.create({
                                  message: "No review yet",
                                  buttons: [{ text: 'Ok', role: 'cancel' }]
                                });
                                await alert.present();
                              });
                  }
                });
            }
            // this.allresponders.forEach((data) => {
            //   firebase.firestore().doc(`responder/${data}`)
            //     .get().
            //     then((result) => {
            //       //here we get the profile of the responder
            //       let res_data = {
            //         id: data,
            //         phone_number: result.data().phoneNumber,
            //         address: result.data().address,
            //         email: result.data().email,
            //         fullname: result.data().fullname,
            //         respondentUnit: result.data().respondantUnit,
            //         responded_responder: result1.data().responded_responder
            //       }
            //       that.allresponders_data.push(res_data);
            //       that.loading.dismiss();
            //     },
            //       error => {
            //         that.loading.dismiss().then(async () => {
            //           const alert = await that.alertCtrl.create({
            //             message: error.message,
            //             buttons: [{ text: 'Ok', role: 'cancel' }]
            //           });
            //           await alert.present();
            //         });
            //         console.log(error);
            //       });//end profile query
            // });
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

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
