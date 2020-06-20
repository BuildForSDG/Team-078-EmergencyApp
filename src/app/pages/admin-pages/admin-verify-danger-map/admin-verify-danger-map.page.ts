import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import { AuthService } from '../../../services/user/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const { Geolocation, Storage } = Plugins;
declare var google;
@Component({
  selector: 'app-admin-verify-danger-map',
  templateUrl: './admin-verify-danger-map.page.html',
  styleUrls: ['./admin-verify-danger-map.page.scss'],
})
export class AdminVerifyDangerMapPage implements OnInit {
  addDangerForm: FormGroup;
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
  dangerInfo = {
    dangerType: '',
    description: '',
    latLong: this.markerlatlong,
  };

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private _auth: AuthService
  ) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then(
          position => {
            this.setLocation(position);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  async addDanger(): Promise<void> {
    if (this.dangerInfo.dangerType !== '' &&
      this.dangerInfo.description !== '') {
      const latLong = this.map.marker.position;
      this.markerlatlong.lat = latLong.lat();
      this.markerlatlong.lng = latLong.lng();
      this.dangerInfo.latLong = this.markerlatlong;

      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this._auth.addDanger(
        this.dangerInfo.dangerType,
        this.dangerInfo.description,
        this.dangerInfo.latLong.lng,
        this.dangerInfo.latLong.lat,
      ).then(() => {
        this.loading.dismiss().then(() => {
          this.alertCtrl
            .create({
              header: 'Location	set!',
              message: 'Danger Added',
              buttons: [{ text: 'Ok' }]
            })
            .then(alert => {
              alert.present();
              this.dangerInfo.dangerType = '';
              this.dangerInfo.description = '';
            });
        });

      }, error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }] });
          await alert.present();
        });
      });

    } else {
      this.alertCtrl
        .create({
          header: 'Error!',
          message: 'All fields are required',
          buttons: [{ text: 'Ok' }]
        }).then(alert => {
          alert.present();
        });
    }
  }

  setLocation(position): void {
    this.loadingCtrl
      .create({
        message: 'Setting current location...'
      })
      .then(overlay => {
        overlay.present();
        // Geolocation.getCurrentPosition().then(
        //   position => {
           
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.map.changeMarkerWithoutAni(this.latitude, this.longitude);
            const data = {
              latitude: this.latitude,
              longitude: this.longitude
            };
            this.markerlatlong.lat = this.latitude;
            this.markerlatlong.lng = this.longitude;
            this.dangerInfo.latLong = this.markerlatlong;
            overlay.dismiss();
            this.alertCtrl
              .create({
                header: 'Map set!',
                message: 'Select Location',
                buttons: [{ text: 'Ok' }]
              })
              .then(alert => {
                alert.present();
              });
        //   },
        //   err => {
        //     console.log(err);
        //     overlay.dismiss();
        //   }
        // );

        google.maps.event.addListener(this.map.map, 'dragend', () => {
          const center = this.map.map.getCenter();
          this.map.changeMarkerWithoutAni(center.lat(), center.lng());
        });

      });
  }
}

