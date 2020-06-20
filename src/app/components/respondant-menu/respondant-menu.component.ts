import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MenuController, AlertController, LoadingController } from "@ionic/angular";
import { Router, RouterEvent } from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: "app-respondant-menu",
  templateUrl: "./respondant-menu.component.html",
  styleUrls: ["./respondant-menu.component.scss"],
})
export class RespondantMenuComponent implements OnInit {
  // properties
  selectedPath: string = "";
  isShowDiv: boolean = false;

  pages = [
    {
      title: "Dashboard",
      url: "/respondant-dashboard",
      icon: "clipboard-outline",
    },
    {
      title: "Profile",
      url: "/respondant-details",
      icon: "person-outline",
    },
    {
      title: "View Emergency",
      url: "/view-emergencies",
      icon: "medkit-outline",
    },
    {
      title: "Respondent History",
      url: "/respondent-history",
      icon: "bonfire-outline",
    },
    {
      title: "Add Danger",
      url: "/respondent-add-danger",
      icon: "flame-outline",
    },
    {
      title: "View Danger",
      url: "/respondent-view-dangers",
      icon: "bonfire-outline",
    }
  ];
  
  // tempPage = [
  //    {
  //     title: "Add Danger",
  //     url: "/respondent-add-danger",
  //     icon: "flame-outline",
  //   },
  //   {
  //     title: "View Danger",
  //     url: "/respondent-view-dangers",
  //     icon: "bonfire-outline",
  //   },
  // ];
  public loading: HTMLIonLoadingElement;

  constructor(
    private location: Location,
    private menu: MenuController,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }
  ngOnInit() {}
  // ionDidClose() {
  //   !this.isShowDiv
  // }
  // toggleDisplayDiv() {
  //   this.isShowDiv = !this.isShowDiv;
  // }

  // toggleDisplayDiv() {
  //   this.menu.toggle('main-menu');
  //   console.log(this.menu)
  // }
  async signOut(){
    this.loading = await this.loadingCtrl.create(); 
    await this.loading.present(); 
    firebase.auth().signOut().then(() => {
      this.loading.dismiss().then(async () => { 
        // this.map.disableMap();
        const alert = await this.alertCtrl.create({ message: "You have logout successfully" , buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
        this.router.navigate(["/respondant-login"]);
      });
        
    }).catch((error) => {
      // An error happened.
      this.loading.dismiss().then(async () => { 
        // this.map.disableMap();
        const alert = await this.alertCtrl.create({ message: error.message , buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    });
  }
 
  goBack() {
    this.location.back();
  }
}
