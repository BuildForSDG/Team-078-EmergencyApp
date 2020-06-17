import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
//import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import { VictimViewUnitOnMapPage } from '../victim-view-unit-on-map/victim-view-unit-on-map.page';
@Component({
  selector: 'app-find-unit',
  templateUrl: './find-unit.page.html',
  styleUrls: ['./find-unit.page.scss'],
})
// declare var google;
export class FindUnitPage implements OnInit,OnDestroy  {
  // @ViewChild(GoogleMapComponent, { static: false })
  // map: GoogleMapComponent;
  userInfo = {
    unitType: '',
    address: '',
    victim_id: ''
  };
  emergencies = [];
  public loading: HTMLIonLoadingElement;
  Response: any;
  constructor(private modalController: ModalController, private router: Router, private _auth: AuthService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
     /*  if (typeof (this.map) === 'undefined') {
           console.log("This Map is Undefined");
      } */
    _auth.getUnitType().then(async (result) => {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.emergencies = await result;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //user is active
        this.userInfo.victim_id = user.uid;
      } else {
        //there is no user, perform anonymous login 
        //we leave this part bllank for now because
        //anonymous ogin would have been performed on the user-welcome page
        //before ever getting here

      }
    });
   
  }

  ngOnInit() {
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

  async submitForm() {
    //Sending the details submited to verify location page.
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    if (this.userInfo.unitType !== '') {
      // const navigationExtras: NavigationExtras = {
      //   state: {
      //     userInfo: this.userInfo
      //   }
      // };
      this.loading.dismiss().then(async () => {
        const modal = await this.modalController.create({
          component: VictimViewUnitOnMapPage,
          componentProps: {
            unitType: this.userInfo.unitType,
            address: this.userInfo.address,
          }
        });
        // return response from modal 
        modal.onWillDismiss().then(dataReturned => {
          this.Response = dataReturned.data;
        });

        return await modal.present();
      });



    } else {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: "All fields are required", buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    }
  }

}
