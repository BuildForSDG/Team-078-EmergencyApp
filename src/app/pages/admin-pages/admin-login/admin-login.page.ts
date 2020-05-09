import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  loginCredentials = {email: '', password: ''};
  constructor(private _auth: AuthService,private router: Router) { }

  ngOnInit() {
  }
  loginUser(){  
    return this._auth.loginUser(this.loginCredentials.email,this.loginCredentials.password).then((result) => {
      alert('You have been successfully logged in!');  
      this.router.navigate(['/admin-dashboard']);  
    }).catch(error => { 
    console.log("Error",error); 
    alert("Error: " + error.message );
    throw new Error(error); 
  }); 
    // if(login){
    //   alert('Login Successful');
    // }else{
    //   alert('Login Failed')
    // }

    // console.log(login);
 
 }
}
