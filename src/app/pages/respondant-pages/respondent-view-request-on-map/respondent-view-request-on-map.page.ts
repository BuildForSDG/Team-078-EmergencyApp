import { Component, ViewChild, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
const { Geolocation, Storage } = Plugins;
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-respondent-view-request-on-map',
  templateUrl: './respondent-view-request-on-map.page.html',
  styleUrls: ['./respondent-view-request-on-map.page.scss'],
})
export class RespondentViewRequestOnMapPage implements OnInit {
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  public loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,
  private loadingCtrl: LoadingController,private modalController: ModalController) { }
  private latitude: number;
  private longitude: number;
  coord: any;
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then((position) => {
          this.setLocation(position);
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

  setLocation(position): void {
    this.loadingCtrl.create({
      message: 'Checking current location...'
    }).then((overlay) => {
      overlay.present();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
     
      //call the watch position function
      var id = Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 }, (position, err) => {
        overlay.dismiss();
        this.map.changeMarkerWithoutAni(position.coords.latitude, position.coords.longitude);
        if (err) {
          console.log(err);
          overlay.dismiss();
          return;
        }
        Geolocation.clearWatch({id});
      });
      const currentLocation = {
        lat : this.latitude,
        lng : this.longitude
      };
    
      this.map.viewRequestOnMap(currentLocation,this.coord);
      
      /**
      Geolocation.getCurrentPosition().then((position) => {
        overlay.dismiss();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        const currentLocation = {
          lat : this.latitude,
          lng : this.longitude
        };
        //this.map.mapLocation();
        this.map.viewRequestOnMap(currentLocation,this.coord);
        const data = {
          latitude: this.latitude,
          longitude: this.longitude
        };
        this.alertCtrl.create({
          header: 'Location	confirmed!',
          // message: 'You can now view any dangers on your current route.',
          buttons: [{ text: 'Ok' }]
        }).then((alert) => {
          alert.present();
        });
      }, (err) => {
        console.log(err);
        overlay.dismiss();
      });
      */
    });
  }

}
