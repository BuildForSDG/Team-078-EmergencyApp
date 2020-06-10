import { Component, ViewChild, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { GoogleMapComponent } from "../../../components/google-map/google-map.component";
import { AuthService } from "../../../services/user/auth.service";
import { RequestService } from "../../../services/victims/request.service";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const {Geolocation} = Plugins;

declare var google;
@Component({
  selector: 'app-victim-confirm-loc-on-map',
  templateUrl: './victim-confirm-loc-on-map.page.html',
  styleUrls: ['./victim-confirm-loc-on-map.page.scss']
})
export class VictimConfirmLocOnMapPage implements OnInit {
  @ViewChild(GoogleMapComponent, { static: false })
  map: GoogleMapComponent;
  private latitude: number;
  private longitude: number;
  public loading: HTMLIonLoadingElement;
  data: any;
  markerlatlong = {
    lat: 0,
    long: 0
  };
  userInfo = {
    emmergency: '',
    address: '',
    latLong: this.markerlatlong,
    phone_number: "",
    victim_id: ""
  };

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private _auth: AuthService,
    private requestService: RequestService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.userInfo;
        this.userInfo.emmergency = this.data.emmergency;
        this.userInfo.address = this.data.address;
        this.userInfo.phone_number = this.data.phone_number;
        this.userInfo.victim_id = this.data.victim_id;
      } else {
        this.router.navigate(['/get-help']);
      }
    });
  }

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
  }
  async addLocationMarker() {
    //create a new date object to use in the creation of the request ref
    var date = new Date();
    this.loading = await this.loadingCtrl.create(); 
    await this.loading.present(); 
    let latLong = this.map.marker.position;
    this.markerlatlong.lat = latLong.lat();
    this.markerlatlong.long = latLong.lng();
    this.userInfo.latLong = this.markerlatlong;
    let request_ref = date.getTime() + this.userInfo.victim_id;
    let responder_email = "";
    //it might be worth it to perform geocoding of the user's confirmed location here
    //the geocoded result can then be sent to assignResponders
    this.geoCodeLatLng(latLong.lat(), latLong.lng()).then( result=>{
      console.log(result);
      var total = result.length - 2 ;
      var formatted_address = result[total].formatted_address;
      console.log(formatted_address);
      this._auth.addRequest(this.userInfo.victim_id,request_ref,this.userInfo.emmergency,
        this.userInfo.latLong.lat,this.userInfo.latLong.long,this.userInfo.address,
        "",responder_email,this.userInfo.phone_number, formatted_address)
      .then( () => {
          //alert all units necessary of this request
          const navigationExtras: NavigationExtras = {
            state: {
              request_ref: request_ref
            }
          };
          this.requestService.assignResponders(this.userInfo.victim_id,request_ref,this.userInfo.emmergency,
            this.userInfo.latLong.lat,this.userInfo.latLong.long,this.userInfo.address,
            "",this.userInfo.phone_number, formatted_address)
          .then( () => {
            this.loading.dismiss().then(() => { 
              this.router.navigate(["/unit-alert"],navigationExtras);
            });
          }, error => { 
            this.loading.dismiss().then( () => { 
              alert("could not alert responders");
            }); 
          });
      }, error => { 
        this.loading.dismiss().then( () => { 
          alert("unable to process request");
        }); 

      });
    }, error=> {
      console.log(error);
    })   
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
            this.markerlatlong.long = this.longitude;
            this.userInfo.latLong = this.markerlatlong;
            this.alertCtrl
              .create({
                header: 'Location	set!',
                message: 'Verify Location',
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
          console.log('Info1', this.map.marker);
        });
      });
  }

  private geoCodeLatLng(lat, lng): Promise<any> {
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    var that = this ;
    return	new	Promise((resolve,	reject)	=>	{
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          resolve(results);
        } else {
          console.log('Geocoder failed due to: ' + status);
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
