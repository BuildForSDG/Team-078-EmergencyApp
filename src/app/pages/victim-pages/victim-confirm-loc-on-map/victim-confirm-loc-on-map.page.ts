import { Component, ViewChild, OnInit } from '@angular/core';
import	{	AlertController,	LoadingController}	from	'@ionic/angular'; 
import	{	Plugins	}	from	'@capacitor/core';
import { Router } from '@angular/router';
import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component'; 

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const { Geolocation, Storage } = Plugins;
declare	var	google;
@Component({
  selector: 'app-victim-confirm-loc-on-map',
  templateUrl: './victim-confirm-loc-on-map.page.html',
  styleUrls: ['./victim-confirm-loc-on-map.page.scss'],
})

export class VictimConfirmLocOnMapPage implements OnInit {

  @ViewChild(GoogleMapComponent, {static: false}) map: GoogleMapComponent;
  private latitude: number;
  private longitude: number;

  public loading: HTMLIonLoadingElement; 

  constructor(private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,private router: Router ) {

     }

  watchPosition() {
     alert("yaga");
  }
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
  
  addLocationMarker(){

    this.alertCtrl.create({										
      header:	'Location	set!',										
      message: 'Okay, Help will arrive soon',										
      buttons:	[{text:	'Ok'}]								
    }).then((alert)	=>	{										
      alert.present();		
      this.router.navigate(['/unit-alert']);						
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
            this.map.changeMarkerWithoutAni(this.latitude,	this.longitude);
            let	data	=	{										
              latitude:	this.latitude,										
              longitude:	this.longitude								
            };
            this.alertCtrl.create({										
              header:	'Location	set!',										
              message: 'Verify Location',										
              buttons:	[{text:	'Ok'}]								
            }).then((alert)	=>	{										
              alert.present();								
            });
        },	(err)	=>	{								
          console.log(err);								
          overlay.dismiss();						
        });

        
    google.maps.event.addListener(this.map.map, 'dragend', () =>{ 
      let center = this.map.map.getCenter();
      this.map.changeMarkerWithoutAni(center.lat(), center.lng());
    });
    });
 }

}
