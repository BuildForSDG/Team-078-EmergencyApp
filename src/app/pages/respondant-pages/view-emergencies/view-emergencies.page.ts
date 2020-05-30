import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  emergencies : any = [];

  // Store values from emergencyList
//   @Input() Number = '098765431';
//   @Input() Time = 'Mon 12 Dec, 2020';
//   @Input() Location = 'National Industrial Court Nigeria 6th Lugard Ave, GRA, Enugu.';
  public Response: string;

  constructor(private modalController: ModalController) {
    //get a list of all emergencie sassigned to this particular responder
    firebase.auth().onAuthStateChanged(user => { 
      if (user) { 
        //user is active
        firebase.firestore().doc(`responder/${user.uid}`).get().then(result=>{
          //here we get the profile of the responder
          var profile_id = result.id ;
          //get all the unresolved emergencies that belong to this responder
          //this is done by looking in the requests table for assigned responders
          firebase.firestore().collection('request').where('assigned_responders', 'array-contains', profile_id)
          //.where('request_type', '==', result.data().respondant_type)
          .where('request_resolved', '==', false)
          //we use onsnapshot to check in realtime for changes in data.
          .onSnapshot(res=>{
            //set emergencies to an empty array so that it is empty for each snapshot
            this.emergencies = [];
            res.forEach(doc=>{
              let data = {
                id: doc.id,
                phone_number : doc.data().victim_number,
                time: doc.data().request_time,
                location: doc.data().request_address
              }
              this.emergencies.push(data);
            })
            //console.log(this.emergencies);
          }, err=>{
            console.log(err);
          });//end assigned responders query
        }, error=>{
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
        phone_number:  request.phone_number,
        time: request.time,
        location: request.location
      }
    });
    // return response from modal 
    modal.onWillDismiss().then(dataReturned => {
      this.Response = dataReturned.data;
    });

    return await modal.present();
  }

  ngOnInit() {
  }

}

