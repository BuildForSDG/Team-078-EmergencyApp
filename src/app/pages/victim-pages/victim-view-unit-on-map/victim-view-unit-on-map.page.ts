import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import * as firebase from 'firebase';
import { Geolocation } from '@capacitor/core';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-victim-view-unit-on-map',
  templateUrl: './victim-view-unit-on-map.page.html',
  styleUrls: ['./victim-view-unit-on-map.page.scss'],
})
export class VictimViewUnitOnMapPage implements OnInit {

  // constructor(private modalController: ModalController) { }

  // ngOnInit() {
  // }
  // async closeModal() {
  //   await this.modalController.dismiss();
  // }
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  public loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private modalController: ModalController,
    private _auth: AuthService) { }
  private latitude: number;
  private longitude: number;
  unitType: string;
  unitsDetails: any;
  coord: any;
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then(async (res) => {
          this.unitsDetails = await this._auth.getUnitsByUnitType(this.unitType);
          this.setLocation();
        }, (err) => {
          console.log(err);
        });
      }
    });
  }
  async closeModal() {
    await this.modalController.dismiss();
    this.map.disableMap();
  }

  setLocation(): void {
    this.loadingCtrl.create({
      message: 'Checking current location...'
    }).then((overlay) => {
      overlay.present();
      const id = Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 }, (position, err) => {
        // Geolocation.clearWatch({id});
        overlay.dismiss();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        const currentLocation = {
          lat: this.latitude,
          lng: this.longitude
        };

        this.map.viewUnitOnMap(currentLocation, this.unitsDetails);
        this.map.changeMarkerWithoutAni(this.latitude, this.longitude);
        const data = {
          latitude: this.latitude,
          longitude: this.longitude
        };
        if (err) {
          console.log(err);
          overlay.dismiss();
          return;
        }

      });
      // Geolocation.getCurrentPosition().then((position) => {
      //   overlay.dismiss();
      //   this.latitude = position.coords.latitude;
      //   this.longitude = position.coords.longitude;
      //   const currentLocation = {
      //     lat : this.latitude,
      //     lng : this.longitude
      //   };
      //   //this.map.mapLocation();
      //   this.map.viewUnitOnMap(currentLocation,this.unitsDetails);
      //   const data = {
      //     latitude: this.latitude,
      //     longitude: this.longitude
      //   };
      //   this.alertCtrl.create({
      //     header: 'Location	confirmed!',
      //     // message: 'You can now view any dangers on your current route.',
      //     buttons: [{ text: 'Ok' }]
      //   }).then((alert) => {
      //     alert.present();
      //   });
      // }, (err) => {
      //   console.log(err);
      //   overlay.dismiss();
      // });
    });
  }

}
