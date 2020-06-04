import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-respondent-back-menu',
  templateUrl: './respondent-back-menu.component.html',
  styleUrls: ['./respondent-back-menu.component.scss'],
})
export class RespondentBackMenuComponent implements OnInit {

  constructor(private location: Location)  { }

  ngOnInit() {}
  goBack() {
    this.location.back();
  }
}
