import { Component, ViewChild, OnInit } from '@angular/core';
import	{	AlertController,	LoadingController	}	from	'@ionic/angular';
import	{	Plugins	}	from	'@capacitor/core';
import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const { Geolocation, Storage } = Plugins;

@Component({
  selector: 'app-view-dangers',
  templateUrl: './view-dangers.page.html',
  styleUrls: ['./view-dangers.page.scss'],
})
export class ViewDangersPage implements OnInit {

  @ViewChild(GoogleMapComponent, {static: false}) map: GoogleMapComponent;

  private latitude: number;
  private longitude: number;

  public loading: HTMLIonLoadingElement;

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit(){

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then((res) => {
          this.setLocation();
        }, (err) => {
          console.log(err);
        });
      }
    });

  }


  setLocation():	void	{
    this.loadingCtrl.create({
      message:	'Setting current location...'
    }).then((overlay)	=>	{
        overlay.present();
        Geolocation.getCurrentPosition().then((position)	=>	{
            overlay.dismiss();
            this.latitude	=	position.coords.latitude;
            this.longitude	=	position.coords.longitude;
            this.map.changeMarker(this.latitude,	this.longitude);
            const	data	=	{
              latitude:	this.latitude,
              longitude:	this.longitude
            };
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
