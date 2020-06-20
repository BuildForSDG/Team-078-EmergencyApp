import { Component, Input, Renderer2, ElementRef, Inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const { Geolocation, Network } = Plugins;

declare var google;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @Input('apiKey') apiKey: string;

  public map: any;
  public marker: any;
  public firstLoadFailed = false;
  private mapsLoaded = false;
  private networkHandler = null;
  public connectionAvailable = true;
  public allMarkers = [];
  private isOpenInfoWindow: boolean = false;
  directionsDisplay: any;
  private direction: boolean = false;
  private currentOpenInfo: any;
  private isRequestDirection: boolean = false;
  private isUnitDisplayed : boolean = false;
  constructor(private renderer: Renderer2, private element: ElementRef,
    private platform: Platform, @Inject(DOCUMENT) private _document) { }

  public init(): Promise<any> {

    return new Promise((resolve, reject) => {
      // if (typeof (google) === 'undefined') {
        this.loadSDK().then(() => {
          this.initMap().then((position) => {
            this.enableMap();
            resolve(position);
          }, (err) => {
            this.disableMap();
            reject(err);
          });
        }, (err) => {
          this.firstLoadFailed = true;
          reject(err);
        });

      // } else {
      //   reject('Google	maps	already	initialised');
      // }

    });

  }

  private loadSDK(): Promise<any> {
    console.log('Loading	Google	Maps	SDK');
    this.addConnectivityListeners();
    return new Promise((resolve, reject) => {
      if (!this.mapsLoaded) {
        Network.getStatus().then((status) => {
          if (status.connected) {
            this.injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });
          } else {
            reject('Not	online');
          }
        }, () => {
          // 	NOTE:	navigator.onLine	temporarily	required	until	Network	Capacitor	plugin	has	web	implementation
          if (navigator.onLine) {
            this.injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });
          } else {
            reject('Not	online');
          }
        }).catch((err) => {
          console.warn(err);
        });
      } else {
        reject('SDK	already	loaded');
      }
    });
  }

  private injectSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
     // window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      // }
      // const script = this.renderer.createElement('script');
      // script.id = 'googleMaps';

      // if (this.apiKey) {
      //   script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=geometry,places';
      // } else {
      //   script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      // }
      // this.renderer.appendChild(this._document.body, script);
    });
  }

  private initMap(): Promise<any> {
    return new Promise((resolve, reject) => {
     // resolve("true");
      Geolocation.getCurrentPosition({  enableHighAccuracy: false,  timeout: 5000 }).then((position) => {
        console.log(position);
        // let	latLng	=	new	google.maps.LatLng(46.064941,13.230720);
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions = {
          center: latLng,
          zoom: 13
        };
        this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
        //resolve the latLng to be used to get the current position
        resolve(position);
      }, (err) => {

        
        console.log(err);
        reject('Could	not	initialise map');
      });

    });

  }

  public watch() {
    return new Promise((resolve, reject) => {
      const id = Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 }, (position, err) => {
        // Geolocation.clearWatch({id});
        if (err) {
          reject(err);
          return;
        }

      });
    });
  }

  disableMap(): void {
    //this.connectionAvailable = false;
    //google = undefined;
  }

  enableMap(): void {
    this.connectionAvailable = true;
  }

  public changeMarker(lat: number, lng: number): void {

    const latLng = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    });
    // 	Remove	existing	marker	if	it	exists
    if (this.marker) {
      this.marker.setMap(null);
    }
    // 	Add	new	marker
    this.marker = marker
  }
  addConnectivityListeners(): void {

    console.warn('The	Capacitor	Network	API	does	not	currently	have	a	web	implementation.	This	will	only	work	when	running	as	an	iOS/Android	app');

    if (this.platform.is('cordova')) {
      this.networkHandler = Network.addListener('networkStatusChange', (status) => {
        if (status.connected) {
          if (typeof google === 'undefined' && this.firstLoadFailed) {
            this.init().then((res) => {
              console.log('Google	Maps	ready.')
            }, (err) => {
              console.log(err);
            });
          } else {
            this.enableMap();
          }
        } else {
          this.disableMap();
        }
      });
    }

  }


  public viewUnitOnMap(usersLocation: any, unitLocation: []): void {
    if (!this.isUnitDisplayed) {
      var markerInfo;

      //loop through unit location and display markers on the map
      unitLocation.forEach((marker) => {
        var image = 'https://maps.google.com/mapfiles/ms/micons/red-dot.png';
        if (marker['unit_type'] == "Fire") {
          image = 'https://maps.google.com/mapfiles/ms/micons/firedept.png';
        }
        if (marker['unit_type'] == "Accident") {
          image = 'https://maps.google.com/mapfiles/ms/micons/hospitals.png';
        }

        markerInfo = new google.maps.Marker({
          position: new google.maps.LatLng(marker['coordinates']['lat'], marker['coordinates']['lng']),
          map: this.map,
          title: marker['unit_title'],
          icon: image
        });
        this.allMarkers.push(markerInfo);
        //var dateCreated = new Date(marker['reg_date']['seconds'] * 1000).toLocaleString();
        var infowindow = new google.maps.InfoWindow({
          content: `<div class=infowindow><h4>${marker['unit_title']}</h4><p>Type: 
        ${marker['unit_type']}</p><p>Phone: 
        ${marker['phone_number']}</p></div>`,
          location: {
            lat: marker['coordinates']['lat'],
            lng: marker['coordinates']['lng'],
          },
          currentInfoMarker: markerInfo
        });
        //event listener to call the infoWindow when the marker is clicked
        //the this.infoCallback(infowindow, markerInfo will ensure that the browsers remembers with marker was 
        //clicked and with what details

        google.maps.event.addListener(markerInfo, 'click', this.infoCallback(infowindow, markerInfo));
        google.maps.event.addListener(markerInfo, 'click', this.getDirectionBetweenMarker(usersLocation, markerInfo));
      });
      this.isUnitDisplayed = true;
    }

  }
  public getDirectionBetweenMarker(fromLocationDetails: any, toLocationDetails: any) {
    var getThat = this;
    return function () {

      if (getThat.direction == true) {
        getThat.directionsDisplay.setMap(null);
        getThat.map.setCenter(new google.maps.LatLng(fromLocationDetails.lat, fromLocationDetails.lng));
      }
      getThat.directionsDisplay = new google.maps.DirectionsRenderer();
      getThat.directionsDisplay.setMap(this.map);

      const start = new google.maps.LatLng(fromLocationDetails.lat, fromLocationDetails.lng);
      const end = new google.maps.LatLng(toLocationDetails.getPosition().lat(), toLocationDetails.getPosition().lng());
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        },
        function (response, status) {
          if (status === 'OK') {
            getThat.directionsDisplay.setDirections(response);
            getThat.direction = true;
          }
        });
      if (this.marker) {
        this.marker.setMap(null);
      }
    }
  }

  public viewRequestOnMap(reponderLocation: {}, requestLocation: {}): void {
    if (!this.isRequestDirection) {
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.map);

      const start = new google.maps.LatLng(reponderLocation['lat'], reponderLocation['lng']);
      const end = new google.maps.LatLng(requestLocation['lat'], requestLocation['lng']);
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        },
        function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          }
        });
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.isRequestDirection = true;
    }
  }

  public victimDisplayMultipleMarkers(markers: []): void {
    var markerInfo;
    //console.log("Auth Details", markers);
    markers.forEach((marker) => {
      var image = 'https://maps.google.com/mapfiles/kml/pal3/icon33.png';
      markerInfo = new google.maps.Marker({
        position: new google.maps.LatLng(marker['location']['lat'], marker['location']['lng']),
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: marker['dangerType'],
        icon: image
      });
      this.allMarkers.push(markerInfo);
      var dateCreated = new Date(marker['request_time']['seconds'] * 1000).toLocaleString();
      var infowindow = new google.maps.InfoWindow({
        content: `<div class=infowindow><h4>${marker['dangerType']}</h4><p>Description: 
        ${marker['description']}</p><p>Date: ${dateCreated}</p></div>`,
        location: {
          lat: marker['location']['lat'],
          lng: marker['location']['lng'],
        },
        currentInfoMarker: markerInfo
      });
      //event listener to call the infoWindow when the marker is clicked
      //the this.infoCallback(infowindow, markerInfo will ensure that the browsers remembers with marker was 
      //clicked and with what details
      google.maps.event.addListener(markerInfo, 'click', this.infoCallback(infowindow, markerInfo));
    });
  }

  public respondentOrAdminDisplayMultipleMarkers(markers: []): void {
    var markerInfo;
    console.log("Auth Details", markers);
    markers.forEach((marker) => {
      var image = 'https://maps.google.com/mapfiles/kml/pal3/icon33.png';
      markerInfo = new google.maps.Marker({
        position: new google.maps.LatLng(marker['location']['lat'], marker['location']['lng']),
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: marker['dangerType'],
        icon: image
      });
      this.allMarkers.push(markerInfo);
      var dateCreated = new Date(marker['request_time']['seconds'] * 1000).toLocaleString();
      var infowindow = new google.maps.InfoWindow({
        content: `<div class=infowindow><h4>${marker['dangerType']}</h4><p>Description: 
        ${marker['description']}</p><p>Date: ${dateCreated}</p></div><ion-button>remove</ion-button>`,
        location: {
          lat: marker['location']['lat'],
          lng: marker['location']['lng'],
        },
        currentInfoMarker: markerInfo
      });
      //event listener to call the infoWindow when the marker is clicked
      //the this.infoCallback(infowindow, markerInfo will ensure that the browsers remembers with marker was 
      //clicked and with what details
      google.maps.event.addListener(markerInfo, 'click', this.infoCallback(infowindow, markerInfo));

      //we add the event listener to remove marker here 
      google.maps.event.addListener(infowindow, 'domready', () => {
        const el = document.querySelector('ion-button');
        el.addEventListener('click', () => this.deleteMarker(infowindow));
      });
    });
  }
  //info window method
  public infoCallback(infowindow, marker) {
    var that = this;

    return function () {
      if (that.isOpenInfoWindow == true) {
        that.currentOpenInfo.close();
      }
      infowindow.open(this.map, marker);
      that.isOpenInfoWindow = true;
      that.currentOpenInfo = infowindow;
    };
  }
  public deleteMarker(infowindow) {
    //fetch the location that matches the selected marker in firestore
    var getLocation = firebase.firestore().collection('road_danger')
      .where('location', '==', infowindow.location)
    getLocation.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        //delete the data
        doc.ref.delete();
        infowindow.close();
        //remove the marker from the map
        infowindow.currentInfoMarker.setMap(null);
      });
    }), error => {
      console.log(error);
    };

  }

  public changeMarkerWithoutAni(lat: number, lng: number): void {

    const latLng = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      map: this.map,
      position: latLng,
      draggable: true
    });
    // Remove existing marker if	it exists
    if (this.marker) {
      this.marker.setMap(null);
    }
    // 	Add	new	marker
    this.marker = marker;

  }
  public geoCodeLatLng(lat, lng): Promise<any> {
    var geocoder = new google.maps.Geocoder;
    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': latlng }, function (results, status) {
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
