import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent
  implements OnInit {
  pages = [
    {
      title: 'Admin Dashboard',
      url: '/admin-dashboard',
      icon: 'clipboard-outline'
    },
    {
      title: 'Add Danger',
      url: '/admin-add-danger',
      icon: "flame-outline"
    },
    // this Keeps spooling to infinity
    // {
    //   title: 'View Responders',
    //   url: '/view-respondant-list',
    // },
    {
      title: 'Add Responders',
      url: '/admin-add-respondant',
      icon: 'person-add-outline'
    },
    {
      title: 'Add Unit',
      url: '/admin-add-unit',
      icon: 'location-outline'
    },
    // this Keeps spooling to infinity
    // {
    //   title: 'View Dangers',
    //   url: '/admin-view-dangers',
    // },
    {
      title: 'View Admin',
      url: '/view-admins',
      icon: 'eye-outline'
    },
  ];


  selectedPath = '';
  menuState = '';
  isToggle = false;
  constructor(
    private location: Location,
    private menu: MenuController,
    private router: Router,
    public zone: NgZone
  ) {

    this.router.events.subscribe(
      (event: RouterEvent) => {
        this.selectedPath = event.url;
      });

  }
  ngOnInit() {
  }

  toggleMenu() {
    this.menu.toggle('main-menu');
  }

  goBack() {
    this.location.back();
  }
}

