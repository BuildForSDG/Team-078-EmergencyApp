import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, LoadingController,ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import { AuthService } from '../../../services/user/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {Geolocation} = Plugins;

declare var google;

@Component({
  selector: 'app-add-respondant-coordinates',
  templateUrl: './add-respondant-coordinates.page.html',
  styleUrls: ['./add-respondant-coordinates.page.scss'],
})
export class AddRespondantCoordinatesPage implements OnInit {
  addDangerForm : FormGroup;
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  private latitude: number;
  private longitude: number;
  public loading: HTMLIonLoadingElement;
  data: any;
  markerlatlong = {
    lat: 0,
    lng: 0
  };
  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private _auth: AuthService,
    public modalCtrl: ModalController
  ) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then(
          res => {
            this.setLocation();
          },
          err => {
            console.log(err);
          }
        );
      }
    });

   // this.setLocation();
  }
  dismissModal() {
    if(this.map.marker){
    const latLong = this.map.marker.position;
    this.markerlatlong.lat = latLong.lat();
    this.markerlatlong.lng = latLong.lng();
    }
    this.modalCtrl.dismiss({
      dismissed: true,
      location : this.markerlatlong
    });
    // disable map
    this.map.disableMap();
  }

  setLocation(): void {
    this.loadingCtrl
      .create({
        message: 'Setting current location...'
      })
      .then(overlay => {
        overlay.present();
        Geolocation.getCurrentPosition().then(
          position => {
            overlay.dismiss();
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.map.changeMarkerWithoutAni(this.latitude, this.longitude);
            const data = {
              latitude: this.latitude,
              longitude: this.longitude
            };
            this.markerlatlong.lat = this.latitude;
            this.markerlatlong.lng = this.longitude;
            this.alertCtrl
              .create({
                header: 'Map set!',
                message: 'Select Location',
                buttons: [{ text: 'Ok' }]
              })
              .then(alert => {
                alert.present();
              });
          },
          err => {
            console.log(err);
            overlay.dismiss();
          }
        );

        google.maps.event.addListener(this.map.map, 'dragend', () => {
          const center = this.map.map.getCenter();
          this.map.changeMarkerWithoutAni(center.lat(), center.lng());
        });

      });
  }
}


