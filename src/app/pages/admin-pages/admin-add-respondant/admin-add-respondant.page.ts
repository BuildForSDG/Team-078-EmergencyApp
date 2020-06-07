import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import {
  LoadingController,
  AlertController,
  ModalController
} from '@ionic/angular';
import { AddRespondantCoordinatesPage } from '../add-respondant-coordinates/add-respondant-coordinates.page';
@Component({
  selector: 'app-admin-add-respondant',
  templateUrl: './admin-add-respondant.page.html',
  styleUrls: ['./admin-add-respondant.page.scss']
})
export class AdminAddRespondantPage implements OnInit {
  addReponderCredentials = {
    email: '',
    password: '',
    fullname: '',
    phone_number: '',
    address: '',
    respondant_unit: '',
    respondantType: '',
    coordinates: {},
    coordinateInfo: ''
  };
  formatted_address = "";
  units = [];
  unitTypes = [];
  public loading: any;
  constructor(
    private _auth: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalController: ModalController
  ) {
    _auth.getUnit().then(async (result) => {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.units = await result;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    });

    _auth.getUnitType().then(async (info) => {
      //this.loading = await this.loadingCtrl.create();
      //await this.loading.present();
      this.unitTypes = await info;
      // this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    });

  }
  public modal: any;
  ngOnInit() { }


  async presentModal() {
    this.modal = await this.modalController.create({
      component: AddRespondantCoordinatesPage,
      componentProps: {
        aParameter: true,
        otherParameter: this.modal
      }
    });

    this.modal.onDidDismiss().then(res => {
      if (res !== null) {
        console.log('The result:', res);
        this.addReponderCredentials.coordinates = res.data.location;
        this.formatted_address = res.data.address;
        console.log(res.data.address);
        this.addReponderCredentials.coordinateInfo = res.data.location.lat + "," + res.data.location.lng;
      }else{
        console.log("No result:", res);

      }
    });

    await this.modal.present();
  }

  async adminAddResponder(): Promise<void> {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    if(
    this.addReponderCredentials.email != "" &&
    this.addReponderCredentials.fullname != "" &&
    this.addReponderCredentials.password != "" &&
    this.addReponderCredentials.phone_number != "" &&
    this.addReponderCredentials.address != "" &&
    this.addReponderCredentials.respondant_unit != "" &&
    this.addReponderCredentials.respondantType != "" &&
    // this.formatted_address != "" &&
    this.addReponderCredentials.coordinates != null){
    this._auth
      .addResponder(
        this.addReponderCredentials.email,
        this.addReponderCredentials.password,
        this.addReponderCredentials.fullname,
        this.addReponderCredentials.phone_number,
        this.addReponderCredentials.address,
        this.addReponderCredentials.respondant_unit,
        this.addReponderCredentials.respondantType,
        this.addReponderCredentials.coordinates,
        this.formatted_address
      )
      .then(
        () => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: "Respondant Created",
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
            this.addReponderCredentials = {
              email: '',
              password: '',
              fullname: '',
              phone_number: '',
              address: '',
              respondant_unit: '',
              respondantType: '',
              coordinates: {},
              coordinateInfo: ''
            };
          })
        }).catch( (error) => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        });
    }else{
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({
          message: 'All fields are required',
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        await alert.present();
      });
    }
  }
}
