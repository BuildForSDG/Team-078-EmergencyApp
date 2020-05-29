import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-victimblue-menu',
  templateUrl: './victimblue-menu.component.html',
  styleUrls: ['./victimblue-menu.component.scss'],
})
export class VictimblueMenuComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

}
