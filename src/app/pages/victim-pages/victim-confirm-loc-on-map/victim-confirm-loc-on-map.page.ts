import { Component, ViewChild, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GoogleMapComponent } from "../../../components/google-map/google-map.component";
import { AuthService } from "../../../services/user/auth.service";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const {Geolocation} = Plugins;
declare var google;
@Component({
  selector: "app-victim-confirm-loc-on-map",
  templateUrl: "./victim-confirm-loc-on-map.page.html",
  styleUrls: ["./victim-confirm-loc-on-map.page.scss"]
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
    emmergency: "",
    address: "",
    latLong: this.markerlatlong,
    phone_number: ""
  };

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private _auth: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.userInfo;
        this.userInfo.emmergency = this.data.emmergency;
        this.userInfo.address = this.data.address;
        this.userInfo.phone_number = this.data.phone_number;
      } else {
        this.router.navigate(["/get-help"]);
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

  addLocationMarker() {
    this.alertCtrl
      .create({
        header: "Location	set!",
        message: "Okay, Help will arrive soon",
        buttons: [{ text: "Ok" }]
      })
      .then(alert => {
        alert.present();
        let latLong = this.map.marker.position;
        this.markerlatlong.lat = latLong.lat();
        this.markerlatlong.long = latLong.lng();
        this.userInfo.latLong = this.markerlatlong;
        let request_ref = "23324256354";
        let responder_email = "tonykay001@gmail.com";
        this._auth.addRequest(
          request_ref,
          this.userInfo.emmergency,
          this.userInfo.latLong.lat,
          this.userInfo.latLong.long,
          this.userInfo.address,
          "",
          responder_email,
          this.userInfo.phone_number
        );

        this.router.navigate(["/unit-alert"]);
      });
  }

  setLocation(): void {
    this.loadingCtrl
      .create({
        message: "Setting current location..."
      })
      .then(overlay => {
        overlay.present();
        Geolocation.getCurrentPosition().then(
          position => {
            overlay.dismiss();
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.map.changeMarkerWithoutAni(this.latitude, this.longitude);
            let data = {
              latitude: this.latitude,
              longitude: this.longitude
            };
            this.markerlatlong.lat = this.latitude;
            this.markerlatlong.long = this.longitude;
            this.userInfo.latLong = this.markerlatlong;
            this.alertCtrl
              .create({
                header: "Location	set!",
                message: "Verify Location",
                buttons: [{ text: "Ok" }]
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

        google.maps.event.addListener(this.map.map, "dragend", () => {
          let center = this.map.map.getCenter();
          this.map.changeMarkerWithoutAni(center.lat(), center.lng());
          console.log("Info1", this.map.marker);
        });
      });
  }
}
