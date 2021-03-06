import { Component, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../../../services/user/auth.service';
import { NavigationStart, Router } from '@angular/router';
const { Geolocation, Storage } = Plugins;

@Component({
  selector: 'app-admin-view-dangers',
  templateUrl: './admin-view-dangers.page.html',
  styleUrls: ['./admin-view-dangers.page.scss'],
})
export class AdminViewDangersPage implements OnInit , OnDestroy{
  @ViewChild(GoogleMapComponent, { static: false }) map: GoogleMapComponent;
  public loading: HTMLIonLoadingElement;
  private locations: [];
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private _auth: AuthService,
    private router: Router) {
  }
  private routeSub:any; 
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then((res) => {
          //fetch dangers from firebase
          this._auth.getDangersLocation().then(async (result) => {
            this.loading = await this.loadingCtrl.create();
            await this.loading.present();
            this.locations = await result;
            this.loadDangers();
           // console.log("Info", result);
            this.loading.dismiss();
          }).catch((error) => {
            this.loading.dismiss().then(async () => {
              const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
              await alert.present();
            });
          })

        }, (err) => {
          console.log(err);
        });
      }
    });

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // save your data
        this.map.disableMap();
      }
    });
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    this.map.disableMap();
  }
 
  loadDangers(): void {
    this.loadingCtrl.create({
      message: 'Setting current location...'
    }).then((overlay) => {
      overlay.present();
     // Geolocation.getCurrentPosition().then((position) => {
        
        //display danger fetched from firebase
        this.map.respondentOrAdminDisplayMultipleMarkers(this.locations);
        this.alertCtrl.create({
          header: 'Location	set!',
          message: 'You can now view any dangers on your current route.',
          buttons: [{ text: 'Ok' }]
        }).then((alert) => {
          alert.present();
        });
        overlay.dismiss();
      // }, (err) => {
      //   console.log(err);
      //   overlay.dismiss();
      // });
    });
  }

  

}
