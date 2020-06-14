import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { RequestService } from 'src/app/services/victims/request.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-unit-alert',
  templateUrl: './unit-alert.page.html',
  styleUrls: ['./unit-alert.page.scss'],
})
export class UnitAlertPage implements OnInit {
  data: any;
  request_ref: string;
  respondents: any;
  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private _auth: AuthService,
    private requestService: RequestService
  ) {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.request_ref = this.router.getCurrentNavigation().extras.state.request_ref;
        //this.request_ref = this.data.request_ref;
        
        var respondents = [];
       await firebase.firestore().collection('request')
          .where('request_ref', '==', this.request_ref).limit(1)
          .get().then(function (querySnapshot) {
            console.log("Request Info",querySnapshot.docs);
            querySnapshot.forEach(async (doc) => {
              console.log("Request Info In",doc.data());
              //fetch details of all assigned respondent
              console.log("responders_now",doc.data().assigned_responders);
              doc.data().assigned_responders.forEach(element => {
                firebase.firestore().doc('responder/'+element)
              .get().then((response) => {
                  respondents.push(response.data());
              }).catch((error) => {
                console.log("Error:" + error);
              });
              });
              
              //console.log(respondents)
            });
          }).catch((error) => {
            console.log("Error:" + error);
          });
        
        
        this.respondents = respondents
        console.log("Respondent", this.respondents);
      } else {
        this.router.navigate(['/get-help']);
      }
      // , error=>{
      //   console.log(error);
      // });
      console.log("Request Ref", this.request_ref);
    }); 

    }

ngOnInit() {
}

}
