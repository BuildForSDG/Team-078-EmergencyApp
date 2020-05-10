import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-respondant-login',
  templateUrl: './respondant-login.page.html',
  styleUrls: ['./respondant-login.page.scss'],
})
export class RespondantLoginPage implements OnInit {

  loginCredentials = {email: '', password: ''};
  constructor(private _auth: AuthService,private router: Router) { }

  ngOnInit() {
  }
  loginUser(){  
    return this._auth.loginUser(this.loginCredentials.email,this.loginCredentials.password).then((result) => {
      alert('You have been successfully logged in!');  
      this.router.navigate(['/respondant-dashboard']);  
    }).catch(error => { 
    console.log("Error",error); 
    alert("Error: " + error.message );
    throw new Error(error); 
  }); 

}

}
