import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.page.html',
  styleUrls: ['./admin-sign-up.page.scss'],
})
export class AdminSignUpPage implements OnInit {

  registerCredentials = {firstname: '', lastname:'', phone_number:'', email: '', password: ''};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  adminAddUser(){
  
     return this._auth.signupUser(this.registerCredentials.firstname,this.registerCredentials.lastname,this.registerCredentials.phone_number,this.registerCredentials.email,this.registerCredentials.password);
    
  }

}
