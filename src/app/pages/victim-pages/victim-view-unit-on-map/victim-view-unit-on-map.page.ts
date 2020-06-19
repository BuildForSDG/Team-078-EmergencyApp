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
export class VictimViewUnitOnMapPage implements OnInit,OnDestroy{

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
    private _auth: AuthService,private router: Router) { 
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
      }else{
        console.log("User not found");
      }
    });
  }
  async closeModal() {
    this.map.disableMap();
    await this.modalController.dismiss();
    
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    this.map.disableMap()
    console.log('Items destroyed');
  }

  setLocation(position): void {
    this.loadingCtrl.create({
      message: 'Checking current location...'
    }).then((overlay) => {
      overlay.present();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      var id = Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 }, (position, err) => {
      Geolocation.clearWatch({id});
         console.log(position);
         this.map.changeMarkerWithoutAni(position.coords.latitude, position.coords.longitude);
            if (err) {
          console.log(err);
          overlay.dismiss();
          return;
        }

     });
        overlay.dismiss();
       
        const currentLocation = {
          lat: this.latitude,
          lng: this.longitude
        };

        this.map.viewUnitOnMap(currentLocation, this.unitsDetails);
        const data = {
          latitude: this.latitude,
          longitude: this.longitude
        };

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
