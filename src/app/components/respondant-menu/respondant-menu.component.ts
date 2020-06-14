import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MenuController} from '@ionic/angular';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-respondant-menu',
  templateUrl: './respondant-menu.component.html',
  styleUrls: ['./respondant-menu.component.scss'],
})
export class RespondantMenuComponent implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/respondant-dashboard',
      icon: 'clipboard-outline'
    },
    {
      title: 'Respondant Details',
      url: '/respondant-details',
      icon: 'person-outline'
    },
    {
      title: 'Add Danger',
      url: '/respondent-add-danger',
      icon: 'flame-outline'
    },
    {
      title: 'View Emergency',
      url: '/view-emergencies',
      icon: 'medkit-outline'
    },
    {
      title: 'View Danger',
      url: '/respondent-view-dangers',
      icon: 'bonfire-outline'
    },
    {
      title: 'Respondent History',
      url: '/respondant-history',
      icon: 'bonfire-outline'
    },
  ];

// <ion-icon name="bonfire-outline"></ion-icon>

  selectedPath = '';

  constructor(
    private location: Location,
    private menu: MenuController,
    private router: Router
  ) {
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


}

