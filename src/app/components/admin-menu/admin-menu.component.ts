import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {
  

  constructor(private location: Location) { 

  }
  ngOnInit() {
  }
  
  goBack() {
  this.location.back();
}
}
