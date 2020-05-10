import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerCredentials = { email: '', password: '' ,confirmation_password:''};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  // signUpUser(){
  //   if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
  //     alert('The password confirmation does not match.');
  //   } else {
  //    return this._auth.signupUser(this.registerCredentials.email,this.registerCredentials.password);
  //   }
  // }

}
