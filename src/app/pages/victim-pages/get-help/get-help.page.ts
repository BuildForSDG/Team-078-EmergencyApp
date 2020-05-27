import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';
import { async } from '@angular/core/testing';
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
  constructor(private router: Router, private _auth: AuthService) { 
   
  }

  ngOnInit() {
    this.getUnit();
    // .then(async res =>{
    //   //await res;
    //   await console.info("My Info", res);
    // }).catch(error => {
    //   console.info("Error", error);
    // });

    // let info = await this._auth.getUnit();
    this._auth.getUnit();   
  }
  async getUnit(): Promise<void>{
    await this._auth.getUnit();
  } 
  submitForm(){
    const navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.userInfo
      }
    };
    this.router.navigate(['/victim-confirm-loc-on-map'], navigationExtras);
  }

}
