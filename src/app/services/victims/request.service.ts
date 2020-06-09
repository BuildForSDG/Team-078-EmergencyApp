import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { PushNotificationService } from '../../services/notifications/push-notification.service';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  responders: any = [];

  constructor(private pushNotification: PushNotificationService, public platform: Platform) { }

  assignResponders(victim_id: string, request_ref: string, request_type: string,
    request_lat: number, request_long: number, request_address: string,
    respond_rating: string, victim_number: string, formatted_address: string): Promise<any> {
    //run a query to find responders that are in the same geocoded location as the victim
    //essentially the same formatted address, which is stae evel in our case
    return firebase.firestore().collection('responder')
    .where('formattedAddress', '==', formatted_address)
    .where('respondantType', '==', request_type)
    .get().then(result=>{
      result.forEach(doc=>{
        console.log(doc.data());
        this.responders.push(doc.id);
        //Here we will want to perform a sort of realtime notification
        //Ideally, it would be a push notification
        //check for platform before using this so as to avoid the error on the web console
        if(this.platform.is('android') || this.platform.is('ios')){
          this.pushNotification ;
        }
      });
      //alert all these responders by populating the assigned_responders
      //on the request
      firebase.firestore().collection('request').where('request_ref','==',request_ref)
      .limit(1).get().then(result=> {
        result.forEach(doc=>{
          firebase.firestore().collection('request').doc(`${doc.id}`).update({
            assigned_responders: this.responders//firebase.firestore.FieldValue.arrayUnion(`${id}`)
          });
        })
        
      }, error=>{
        console.log(error);
      });
    });
  }


}
