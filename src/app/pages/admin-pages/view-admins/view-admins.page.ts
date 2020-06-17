import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-admins',
  templateUrl: './view-admins.page.html',
  styleUrls: ['./view-admins.page.scss'],
})
export class ViewAdminsPage implements OnInit {
  adminList : [];
  constructor() { }

  ngOnInit() {
  }

}
