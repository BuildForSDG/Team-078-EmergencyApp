import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.page.html',
  styleUrls: ['./get-help.page.scss'],
})
export class GetHelpPage implements OnInit {
  userInfo = {
    emmergency: '',
    address: '',
    phone_number:''
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  submitForm(){
    let navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.userInfo
      }
    }; 
    this.router.navigate(['/victim-confirm-loc-on-map'], navigationExtras);
  }

}
