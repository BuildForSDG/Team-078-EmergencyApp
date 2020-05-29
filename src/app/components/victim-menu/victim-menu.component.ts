import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-victim-menu',
  templateUrl: './victim-menu.component.html',
  styleUrls: ['./victim-menu.component.scss'],
})
export class VictimMenuComponent implements OnInit {

  userMenu: any;

  constructor(private location: Location) { }

  ngOnInit() {
    this.userMenu = {
      pageTitle: 'find Unit',
      menuLogo: 'alert'
    }
  }

  goBack() {
    this.location.back();
  }

}



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

// these are users' path
//   'find-unit',
//   'get-help',
//   'unit-alert',
//   'user-location'
//   'victim-confirm-loc-on-map'
//   'view-dangers'
//   'view-unit',
// ]

