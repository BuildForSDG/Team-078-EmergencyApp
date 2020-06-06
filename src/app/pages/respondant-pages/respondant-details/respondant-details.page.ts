import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
@Component({
  selector: 'app-respondant-details',
  templateUrl: './respondant-details.page.html',
  styleUrls: ['./respondant-details.page.scss'],
})
export class RespondantDetailsPage implements OnInit {

  constructor() {

    firebase.auth().onAuthStateChanged(user => { 
      if (user) { 
        //user is active
        firebase.firestore().doc(`responder/${user.uid}`).get().then(result=>{
          //here we get the profile of the responder
          var profile_id = result.id ;
          console.log("Respondent Info: " , result.id);
          console.log("Info",result['address']);
        }, error=>{
          console.log(error);
        });//end profile query
      }
    });

   }

  ngOnInit() {
  }

}
