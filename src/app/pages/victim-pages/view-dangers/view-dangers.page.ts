import { Component, ViewChild, OnInit, NgZone, OnDestroy, HostListener } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GoogleMapComponent } from '../../../components/google-map/google-map.component';
import { GooglePlacesComponent } from '../../../components/google-places/google-places.component';
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
export class ViewDangersPage implements OnInit, OnDestroy {

  @ViewChild(GoogleMapComponent, { static: false }) map: GoogleMapComponent;
  @ViewChild(GooglePlacesComponent, { static: false }) places: GooglePlacesComponent;

  private latitude: number;
  private longitude: number;

  public loading: HTMLIonLoadingElement;
  private locations: [];

  private destinationLatLng: any = {};

  private region: any = {};

  private direction: boolean = false;
  current_position: any;
  directionsDisplay: any;
  public myposition = {
    coords : {
     latitude : 6.5568767999999995,
     longitude : 3.3325056
    }
  }
  address: Object;
  formattedAddress: string;
  id: any;
  constructor(private alertCtrl: AlertController, public zone: NgZone,
    private loadingCtrl: LoadingController, private _auth: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userCoordinates = JSON.parse(localStorage.getItem('userCoordinates'));
        this.map.init(userCoordinates).then((res) => {
          this.places.getPlaceAutocomplete();
          this._auth.getDangersLocation().then(async (result) => {
            this.loading = await this.loadingCtrl.create();
            await this.loading.present();
            this.locations = result;
            this.current_position = res;
            this.loadDangers(res);
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
  @HostListener('unloaded')
  ngOnDestroy() {
    this.map.disableMap();
    navigator.geolocation.clearWatch(this.id);
    console.log('Items destroyed');
  }
  loadDangers(position): void {
    this.loadingCtrl.create({
      message: 'Setting current location...'
    }).then((overlay) => {
      overlay.present();
      // Geolocation.getCurrentPosition().then((position)	=>	{
      overlay.dismiss();
      this.map.victimDisplayMultipleMarkers(this.locations);
      this.alertCtrl.create({
        header: 'Location	set!',
        message: 'You can now view any dangers on your current route.',
        buttons: [{ text: 'Ok' }]
      }).then((alert) => {
        alert.present();
      });
      //track user's location
    
      //track user's location ends here
      // },	(err)	=>	{
      //   console.log(err);
      //   overlay.dismiss();
      // });
    });

    var target, options;
    var that = this;
    function success(pos) {
      var crd = pos.coords;

      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        alert('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(that.id);
      }

      that.map.changeMarkerWithoutAniAndDraggable(pos.coords.latitude, pos.coords.longitude);
      let userCoordinates = {
        coords: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      }
      localStorage.setItem('userCoordinates', JSON.stringify(userCoordinates));
      //navigator.geolocation.clearWatch(that.id);
      console.log("id Info", that.id);
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

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
    //convert the address to coordinates to be used in the geometry
    //pass the array of geo locations into this function
    //also pass the current position into this function
    this.places.geocodeAddress(this.formattedAddress, this.locations)
      .then(result => {
        //console.log(result, "result");
        // Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 }).then((current_pos) => {
        //remove any previously drawn directional lines.
        if (this.direction == true) {
          this.directionsDisplay.setMap(null);
          this.map.map.setCenter(new google.maps.LatLng(this.current_position.coords.latitude, this.current_position.coords.longitude));
        }
        //destination coordinates from the geocoding 
        this.destinationLatLng = result;
        //perform the geometric function to find the relevent coordinates 
        var coords = [
          //origin
          { lat: this.current_position.coords.latitude, lng: this.current_position.coords.longitude },
          //destination
          { lat: this.destinationLatLng.lat, lng: this.destinationLatLng.lng }
        ];
        /**
        this.region = new google.maps.Polyline({
          path: coords, 
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        this.region.setMap(this.map.map);
         */

        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map.map);
        const start = new google.maps.LatLng(this.current_position.coords.latitude, this.current_position.coords.longitude);
        const end = new google.maps.LatLng(this.destinationLatLng.lat, this.destinationLatLng.lng);
        const directionsService = new google.maps.DirectionsService();
        //we declare a variable that because 
        //"this" becomes undefined inside the route callback
        var that = this;
        directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
          },
          function (response, status) {
            if (status === 'OK') {
              that.directionsDisplay.setDirections(response);
              //set a variable to tell that directions service has been initiated
              that.direction = true;
            }
          });

        // }, (err) => {
        //   console.log(err);
        // });

      }, error => {
        console.log(error);
      });

  }

}
