import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respondant-login',
  templateUrl: './respondant-login.page.html',
  styleUrls: ['./respondant-login.page.scss']
})
export class RespondantLoginPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
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
          this.router.navigate(['/respondant-dashboard']);
        });
      }, error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
          await alert.present();
        });
      } );
    }
  }

}
