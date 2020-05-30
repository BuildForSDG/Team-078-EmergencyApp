import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.page.html',
  styleUrls: ['./admin-sign-up.page.scss'],
})
export class AdminSignUpPage implements OnInit {

  public loading: any;

  registerCredentials = { firstname: '', lastname: '', phone_number: '', email: '', password: '' };
  constructor(private _auth: AuthService,
    public router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async adminAddUser(): Promise<void> {

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this._auth.signupUser(this.registerCredentials.firstname,
      this.registerCredentials.lastname,
      this.registerCredentials.phone_number,
      this.registerCredentials.email,
      this.registerCredentials.password).then(() => {
        this.loading.dismiss().then(() => {
          this.router.navigate(['/admin-dashboard']);
        });
      }, error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }] });
          await alert.present();
        });
      });


  }

}
