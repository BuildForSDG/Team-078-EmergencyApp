import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-victimblue-menu',
  templateUrl: './victimblue-menu.component.html',
  styleUrls: ['./victimblue-menu.component.scss'],
})
export class VictimblueMenuComponent implements OnInit {
  // properties
  routerlocation: string = this.router.url;
  menuItem: string[];
  menuSegment: string

  constructor(private location: Location, private router: Router) {
    // this is reserved incase we add more
    //pages, switch method will be used to
    //display content based on user's visit
    this.menuItem = [
      "admin-dashboard",
      "welcom-page",
      "respondant-login",
      "respondant-dashboard",
      "admin-sign-up",
      "admin-login",
      "admin-add-respondant",
      "splash-page",
      "get-help",
      "user-welcome",
      "find-unit",
      "unit-alert",
      "view-unit",
      "user-location",
    ];
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  // This is used to make the logo dynamic
  // logoUpdate() {
  //   return this.routerlocation === "/get-help"
  //     ? "/assets/md-custom-handshake.svg"
  //     : "/assets/md-custom-focus.svg";
  // }

  // This is used to make the logo dynamic
  // titleUpdate() {
  //   return this.routerlocation === "/get-help" ? "Get Help" : "Find Unit";
  // }

  // triggers wen menu button is clicked
  flipSegment(): void {
    if (this.menuSegment === 'get-help') {
      this.menuSegment = 'find-unit';
    } else {
      this.menuSegment = 'get-help';
    }
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
//

// this.menuItem = [
//   'admin-dashboard',
//   'welcom-page',
//   'respondant-login',
//   'respondant-dashboard',
//   'admin-sign-up',
//   'admin-login',
//   'admin-add-respondant',
//   'splash-page',
//   'user-welcome',]

