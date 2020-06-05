import { Component,ViewChild,OnInit } from '@angular/core';
import	{	AlertController,	LoadingController	}	from	'@ionic/angular';
import	{	Plugins	}	from	'@capacitor/core';
import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../../../services/user/auth.service';
const { Geolocation, Storage } = Plugins;

@Component({
  selector: 'app-respondent-view-dangers',
  templateUrl: './respondent-view-dangers.page.html',
  styleUrls: ['./respondent-view-dangers.page.scss'],
})
export class RespondentViewDangersPage implements OnInit {
  @ViewChild(GoogleMapComponent, {static: false}) map: GoogleMapComponent;
  public loading: HTMLIonLoadingElement;
  private locations: [];
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private _auth: AuthService) { 
     

    }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then((res) => {
          this._auth.getDangersLocation().then(async (result) => {
            this.loading = await this.loadingCtrl.create();
            await this.loading.present();
            this.locations = await result;
            this.loadDangers();
            console.log("Info", result);
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
  }

  
  loadDangers():	void	{
    this.loadingCtrl.create({
      message:	'Setting current location...'
    }).then((overlay)	=>	{
        overlay.present();
        Geolocation.getCurrentPosition().then((position)	=>	{
            overlay.dismiss();
            // this.latitude	=	position.coords.latitude;
            // this.longitude	=	position.coords.longitude;
            // var locations = [
            //   [-33.890542, 151.274856, 4],
            //   [-33.923036, 151.259052, 5],
            //   [-34.028249, 151.157507, 3],
            //   [-33.80010128657071, 151.28747820854187, 2],
            //   [ -33.950198, 151.259302, 1]
            // ];
            this.map.displayMultipleMarkers(this.locations);
            // const	data	=	{
            //   latitude:	this.latitude,
            //   longitude:	this.longitude
            // };
            this.alertCtrl.create({
              header:	'Location	set!',
              message: 'You can now view any dangers on your current route.',
              buttons:	[{text:	'Ok'}]
            }).then((alert)	=>	{
              alert.present();
            });
        },	(err)	=>	{
          console.log(err);
          overlay.dismiss();
        });
    });
 }



}
