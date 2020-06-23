import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
import * as firebase from 'firebase';
import { Geolocation } from '@capacitor/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { RouterEvent, Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-victim-view-unit-on-map',
  templateUrl: './victim-view-unit-on-map.page.html',
  styleUrls: ['./victim-view-unit-on-map.page.scss'],
})
export class VictimViewUnitOnMapPage implements OnInit, OnDestroy {

  // constructor(private modalController: ModalController) { }

  // ngOnInit() {
  // }
  // async closeModal() {
  //   await this.modalController.dismiss();
  // }
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  id : any;
  public loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private modalController: ModalController,
    private _auth: AuthService, private router: Router) {
    // var that = this;
    // this.router.events.subscribe(async (event: RouterEvent) => {
    //   console.log("Route Changed");

    //   await this.map.disableMap();
    // });
  }
  private latitude: number;
  private longitude: number;
  unitType: string;
  unitsDetails: any;
  coord: any;
  
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then(async (position) => {
          this.unitsDetails = await this._auth.getUnitsByUnitType(this.unitType);
          this.setLocation(position);
        }, (err) => {
          // this.setLocation();
          console.log(err);
        });
      } else {
        console.log("User not found");
      }
    });
  }
  async closeModal() {
    this.map.disableMap();
    await this.modalController.dismiss();
    navigator.geolocation.clearWatch(this.id);

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
      const currentLocation = {
        lat: this.latitude,
        lng: this.longitude
      };
      this.map.changeMarkerWithoutAniAndDraggable(position.coords.latitude, position.coords.longitude);
      this.map.viewUnitOnMap(currentLocation, this.unitsDetails);
      overlay.dismiss();
      });
      const data = {
        latitude: this.latitude,
        longitude: this.longitude
      };
      
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
    
    
  }

}
