import { Component, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
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
export class RespondentViewRequestOnMapPage implements OnInit, OnDestroy {
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  id : any;
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
    navigator.geolocation.clearWatch(this.id);
    await this.modalController.dismiss();
    this.map.disableMap();
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.map.disableMap()
    navigator.geolocation.clearWatch(this.id);
    console.log('Items destroyed');
  }

  setLocation(position): void {
    this.loadingCtrl.create({
      message: 'Checking current location...'
    }).then((overlay) => {
      overlay.present();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
     
      //call the watch position function
      // var id = Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 }, (position, err) => {
      //   overlay.dismiss();
      //   this.map.changeMarkerWithoutAni(position.coords.latitude, position.coords.longitude);
      //   if (err) {
      //     console.log(err);
      //     overlay.dismiss();
      //     return;
      //   }
      //   Geolocation.clearWatch({id});
      // });
      this.map.changeMarkerWithoutAniAndDraggable(position.coords.latitude, position.coords.longitude);
      overlay.dismiss();
      var target, options;
      var that = this;
      function success(pos) {
        var crd = pos.coords;

        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
          alert('Congratulations, you reached the target');
          navigator.geolocation.clearWatch(that.id);
        }
        
        that.map.changeMarkerWithoutAniAndDraggable(pos.coords.latitude, pos.coords.longitude);
        //navigator.geolocation.clearWatch(that.id);
        console.log("id Info",that.id);
        // that.id = navigator.geolocation.watchPosition(success, error, options);
      }

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }

      target = {
        latitude: 0,
        longitude: 0
      };

      options = {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 0
      };

      this.id = navigator.geolocation.watchPosition(success, error, options);
    

      const currentLocation = {
        lat : this.latitude,
        lng : this.longitude
      };
    
      this.map.viewRequestOnMap(currentLocation,this.coord);

    });
  }

}
