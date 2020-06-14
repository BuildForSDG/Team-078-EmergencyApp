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
      title: 'Respondant Dashboard',
      url: '/respondant-dashboard',
    },
    {
      title: 'Respondant Details',
      url: '/respondant-details',
    },
    {
      title: 'Add Danger',
      url: '/respondent-add-danger',
    },
    {
      title: 'View Emergency',
      url: '/view-emergencies',
    },
    {
      title: 'View Danger',
      url: '/respondent-view-dangers',
    },
  ];



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

