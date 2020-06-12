import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Location } from "@angular/common";
import {  Router } from "@angular/router";

@Component({
  selector: "app-admin-menu",
  templateUrl: "./admin-menu.component.html",
  styleUrls: ["./admin-menu.component.scss"],
})
export class AdminMenuComponent implements OnInit {
  
  constructor(private location: Location, 
    private menu: MenuController, 
    private route: Router) { }
  ngOnInit() {

   }

   openFirst() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

  goBack() {
    this.location.back();
  }
}
