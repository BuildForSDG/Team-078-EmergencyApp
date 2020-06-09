import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input,  Renderer2, ElementRef, Inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { GoogleMapComponent } from '../../components/google-map/google-map.component';

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss'],
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', {static: false}) addresstext: any;
  @Input('apiKey') apiKey: string;
  @ViewChild(GoogleMapComponent, {static: false}) map: GoogleMapComponent;

  autocompleteInput: string;
  queryWait: boolean;
  public firstLoadFailed = false;

  dangersInPath: any = [];

  constructor(private platform: Platform,private renderer: Renderer2,@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  public getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'NG' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  geocodeAddress(address, locations) {
    return new Promise((resolve, reject) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          //destination coordinates from the geocoding 
          var dest_pos = results[0].geometry.location;
          var destination = {lat: dest_pos.lat(), lng: dest_pos.lng()};
          resolve(destination);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          reject();
        }
      });

    });//end promise
    
    
  }

}
