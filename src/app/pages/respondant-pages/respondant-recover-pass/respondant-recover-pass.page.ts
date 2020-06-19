import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-respondant-recover-pass',
  templateUrl: './respondant-recover-pass.page.html',
  styleUrls: ['./respondant-recover-pass.page.scss'],
})
export class RespondantRecoverPassPage implements OnInit {
  email: string = "";
  constructor() { }

  ngOnInit() {
  }
  recover() {
    if (this.email != "") {
      alert("An Email has been sent to you");
      this.email = "";
    } else {
      alert("Email field is required");
    }
  }
}
