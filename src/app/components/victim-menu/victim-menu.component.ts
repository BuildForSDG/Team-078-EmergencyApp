import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-victim-menu',
  templateUrl: './victim-menu.component.html',
  styleUrls: ['./victim-menu.component.scss'],
})
export class VictimMenuComponent implements OnInit {
  // properties
  menuItem: string[]
  
 

  constructor() { 
    this.menuItem = [
      'admin-dashboard',
      'welcom-page',
      'respondant-login',
      'respondant-dashboard',
      'admin-sign-up',
      'admin-login',
      'admin-add-respondant',
      'splash-page',
      'get-help',
      'user-welcome',
      'find-unit',
      'unit-alert',
      'view-unit',
      'user-location'
    ]
  }

  ngOnInit() {}

}

