import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MenuController } from "@ionic/angular";
import { Router, RouterEvent } from "@angular/router";

@Component({
  selector: 'app-victimblue-menu',
  templateUrl: './victimblue-menu.component.html',
  styleUrls: ['./victimblue-menu.component.scss'],
})
export class VictimblueMenuComponent implements OnInit {
    // properties
    routerlocation: string = this.router.url;
    menuItem: string[];
    menuSegment: string;
    selectedPath: string = "";
    isShowDiv: boolean = false;
    page: Object[];

    pages = [
      {
        title: "Get Help",
        url: "/get-help",
        icon: "medkit-outline"
      },
      {
        title: "Find Unit",
        url: "/find-unit",
        icon: "help-buoy-outline"
      },
      {
        title: "View Dangers",
        url: "/view-dangers",
        icon: "flame-outline"
      },
      {
        title: "Request History",
        url: "/victim-request-history",
        icon: "boat-outline"
      }
    ];

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

  toggleDisplayDiv() {
    switch (this.isShowDiv) {
      case true:
        return false;
      case false:
        return true;
      default:
        return true;
    }
  }

  goBack() {
    this.location.back();
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
