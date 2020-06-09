import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import	{	AlertController,	LoadingController	}	from	'@ionic/angular';
import	{	Plugins	}	from	'@capacitor/core';
import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';
import	{	GooglePlacesComponent	}	from	'../../../components/google-places/google-places.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const { Geolocation } = Plugins;

import { AuthService } from '../../../services/user/auth.service';

declare var google;

@Component({
  selector: 'app-view-dangers',
  templateUrl: './view-dangers.page.html',
  styleUrls: ['./view-dangers.page.scss'],
})
export class ViewDangersPage implements OnInit {

  @ViewChild(GoogleMapComponent, {static: false}) map: GoogleMapComponent;
  @ViewChild(GooglePlacesComponent, {static: false}) places: GooglePlacesComponent;

  private latitude: number;
  private longitude: number;

  public loading: HTMLIonLoadingElement;
  private locations: [];

  private destinationLatLng: any = {};

  private region: any = {};

  address: Object;
  formattedAddress: string;

  constructor(private alertCtrl: AlertController, public zone: NgZone,
    private loadingCtrl: LoadingController, private _auth: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.map.init().then((res) => {
          this.places.getPlaceAutocomplete();
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
            this.map.victimDisplayMultipleMarkers(this.locations);
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

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    //convert the address to coordinates to be used in the geometry
    //pass the array of geo locations into this function
    //also pass the current position into this function
    this.places.geocodeAddress(this.formattedAddress, this.locations)
    .then(result=>{
      //console.log(result, "result");
      Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 }).then((current_pos) => {
        //remove any previously drawn lines.
        if(typeof(this.region.geodesic) != 'undefined'){
          this.region.setMap(null);
          this.map.map.setCenter(new google.maps.LatLng(current_pos.coords.latitude, current_pos.coords.longitude));
        }
        //destination coordinates from the geocoding 
        this.destinationLatLng = result; 
        //perform the geometric function to find the relevent coordinates 
        var coords = [
          //origin
          {lat: current_pos.coords.latitude, lng: current_pos.coords.longitude},
          //destination
          {lat: this.destinationLatLng.lat, lng: this.destinationLatLng.lng}
        ];
        this.region = new google.maps.Polyline({
          path: coords, 
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        this.region.setMap(this.map.map);

      }, (err) => {
        console.log(err);
      });

    }, error=> {
      console.log(error);
    });
    
  }

}
