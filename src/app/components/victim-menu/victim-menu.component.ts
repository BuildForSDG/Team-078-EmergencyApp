import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-victim-menu',
  templateUrl: './victim-menu.component.html',
  styleUrls: ['./victim-menu.component.scss'],
})
export class VictimMenuComponent implements OnInit {

  routerlocation: string = this.router.url;

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    
  }

  goBack() {
    this.location.back();
  }

  // this is used to make the logo dynamic
  logoUpdate(){
   return (this.routerlocation === '/get-help') ? 
   '/assets/md-custom-focus.svg' : 
   '/assets/md-custom-handshake.svg';
  }

  //this is used to make the logo dynamic
  titleUpdate() {
    return (this.routerlocation === '/get-help') ? 
    'Find Unit' : 'Get Help';
  }
}




// these are users' path
//   'find-unit',
//   'get-help',
//   'unit-alert',
//   'user-location'
//   'victim-confirm-loc-on-map'
//   'view-dangers'
//   'view-unit',
// ]


// this.menuItem = [
//   'admin-dashboard',
//   'welcom-page',
//   'respondant-login',
//   'respondant-dashboard',
//   'admin-sign-up',
//   'admin-login',
//   'admin-add-respondant',
//   'splash-page',
//   'user-welcome',



