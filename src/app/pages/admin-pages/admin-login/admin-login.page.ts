import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  public loading: HTMLIonLoadingElement; 

  constructor(
    private _auth: AuthService,
    private router: Router,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) { 
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  async loginUser(): Promise<void> { 
    if (!this.loginForm.valid) { 
      console.log('Form is not valid yet, current value:', this.loginForm.value); 
    } else {
      this.loading = await this.loadingCtrl.create(); 
      await this.loading.present(); 
      const email = this.loginForm.get('email').value; 
      const password = this.loginForm.get('password').value; 
      this._auth.loginUser(email, password).then( () => { 
        this.loading.dismiss().then(() => { 
          this.router.navigate(['/admin-dashboard']);
        }); 
      }, error => { 
        this.loading.dismiss().then(async () => { 
          const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], }); 
          await alert.present(); 
        }); 
      } );
    }
  }
  /**
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
  */
}
