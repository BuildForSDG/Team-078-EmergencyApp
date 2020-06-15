import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MenuController } from "@ionic/angular";
import { Router, RouterEvent } from "@angular/router";

@Component({
  selector: "app-victim-menu",
  templateUrl: "./victim-menu.component.html",
  styleUrls: ["./victim-menu.component.scss"],
})
export class VictimMenuComponent implements OnInit {
  // properties
  routerlocation: string = this.router.url;
  menuItem: string[];
  menuSegment: string;

  pages = [
    {
      title: "Find Unit",
      url: "/find-unit",
      icon: "help-buoy-outline"
    },
    {
      title: "Get Help",
      url: "/get-help",
      icon: "medkit-outline"
    },
    {
      title: "User Location",
      url: "/user-location",
      icon: "location-outline"
    },
    {
      title: "View Dangers",
      url: "/view-dangers",
      icon: "flame-outline"
    },
    {
      title: "View Units",
      url: "/view-unit",
      icon: "boat-outline"
    }
  ];


  selectedPath = '';

  constructor(
    private location: Location, 
    private menu: MenuController, 
    private router: Router) {
      this.router.events.subscribe(
        (event: RouterEvent) => {
          this.selectedPath = event.url;
        }
      );
    }

  ngOnInit() {}

  toggleMenu() {
    this.menu.toggle('main-menu');
  }

  goBack() {
    this.location.back();
  }

  // This is used to make the logo dynamic
  logoUpdate() {
    return this.routerlocation === "/get-help"
      ? "/assets/md-custom-handshake.svg"
      : "/assets/md-custom-focus.svg";
  }

  // This is used to make the logo dynamic
  titleUpdate() {
    if(this.routerlocation ==="/get-help" ){
       return "Get Help"
    }

    if(this.routerlocation ==="/find-unit" ){
      return "Find Unit"
    }
    if(this.routerlocation ==="/view-dangers" ){
      return "Dangers"
    }
    if(this.routerlocation ==="/victim-request-history" ){
      return "Request History"
    }
  
  }

  // triggers wen menu button is clicked
  flipSegment(): void {
    if (this.menuSegment === "get-help") {
      this.menuSegment = "find-unit";
    } else {
      this.menuSegment = "get-help";
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
