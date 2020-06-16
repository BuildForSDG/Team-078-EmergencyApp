import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MenuController } from "@ionic/angular";
import { Router, RouterEvent } from "@angular/router";

@Component({
  selector: "app-admin-menu",
  templateUrl: "./admin-menu.component.html",
  styleUrls: ["./admin-menu.component.scss"],
})
export class AdminMenuComponent implements OnInit {
  // Properties
  selectedPath: string = "";
  isShowDiv: boolean = false;

  pages = [
    {
      title: "Admin Dashboard",
      url: "/admin-dashboard",
      icon: "clipboard-outline",
    },
    {
      title: "Add Danger",
      url: "/admin-add-danger",
      icon: "flame-outline",
    },
    {
      title: "View Dangers",
      url: "/admin-view-dangers",
      icon: "bonfire-outline",
    },
    {
      title: "Add Responders",
      url: "/admin-add-respondant",
      icon: "person-add-outline",
    },
    {
      title: "View Respondents",
      url: "/view-respondant-list",
      icon: "eye-outline",
    },
    {
      title: "Add Unit",
      url: "/admin-add-unit",
      icon: "location-outline",
    },
  ];

  menuState = '';
  isToggle = false;
  constructor(
    private location: Location,
    private menu: MenuController,
    private router: Router
  ) {

    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {

  }

  toggleDisplayDiv() {
    this.menu.toggle('main-menu');
  }


  goBack() {
    this.location.back();
  }
}
