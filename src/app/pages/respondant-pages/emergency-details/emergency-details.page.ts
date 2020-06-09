import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { RespondentViewRequestOnMapPage } from '../respondent-view-request-on-map/respondent-view-request-on-map.page';
@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.page.html',
  styleUrls: ['./emergency-details.page.scss'],
})
export class EmergencyDetailsPage implements OnInit {
  
  phone_number: string ;
  time: any ;
  location: any ;
  coord: any;
  id: any ;
  responded: boolean = false ;
  constructor(private modalController: ModalController) { 
    //it is important to disable the respond button.
    //this will be done by getting listening for changes on the model
    //and getting the snapshot of the data in realtime
    firebase.auth().onAuthStateChanged(user => { 
      if (user) {
        firebase.firestore().doc(`request/${this.id}`)
        .onSnapshot(result=> {
          //console.log(result.data());
          if(result.data().responded_responder != ""){
            this.responded = true ;
          }else{
            this.responded = false
          }
        }, error=> {
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
  async openMapModal() {
    const modal = await this.modalController.create({
      component: RespondentViewRequestOnMapPage,
      componentProps: {
        coord: this.coord
      }
    });
    // return response from modal 
    modal.onWillDismiss();
    return await modal.present();
  }

  respond(){
    firebase.auth().onAuthStateChanged(user => { 
      if (user) {
        firebase.firestore().doc(`request/${this.id}`)
        .onSnapshot(result=> {
          if(result.data().responded_responder == ""){
            firebase.firestore().doc(`request/${this.id}`)
            .update({responded_responder: user.uid});
            this.responded = true ;
          }
        }, error=> {
          console.log(error);
        })
      }

    });
  }
}
