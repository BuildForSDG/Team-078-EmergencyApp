import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/user/auth.service';
import * as firebase from 'firebase/app';
import { AddRespondantCoordinatesPage } from "../add-respondant-coordinates/add-respondant-coordinates.page";
@Component({
  selector: 'app-admin-add-unit',
  templateUrl: './admin-add-unit.page.html',
  styleUrls: ['./admin-add-unit.page.scss'],
})

export class AdminAddUnitPage implements OnInit {
  addUnitForm: FormGroup;
  public modal: any;
  coordinatesInfo = {
    location: {},
    locationString: ""
  }
  emergencies = [];
  validation_messages = {
    'unit_title': [
      { type: 'required', message: 'Title is required.' },
    ],
    'unit_type': [
      { type: 'required', message: 'Unit Type is required.' },
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
    ],
    'phone_number': [
      { type: 'required', message: 'Phone number is required.' },
    ],
    'coordinates': [
      { type: 'required', message: 'Coordinates is required.' },
    ]
  };
  public loading: HTMLIonLoadingElement;
  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private _auth: AuthService,
    public modalController: ModalController) {
    this.addUnitForm = new FormGroup({
      'unit_title': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'unit_type': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'address': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'phone_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'coordinates': new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    _auth.getUnitType().then(async (result) => {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this.emergencies = await result;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
        await alert.present();
      });
    })
  }

  ngOnInit() {
  }

  async adminAddUnit(): Promise<void> {
    if (!this.addUnitForm.valid) {
      console.log('Form is not valid yet, current value:', this.addUnitForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      this._auth.addUnit(this.addUnitForm.get("unit_title").value,
        this.addUnitForm.get("unit_type").value,
        this.addUnitForm.get("address").value,
        this.addUnitForm.get("phone_number").value,
        this.coordinatesInfo.location).then(() => {
          this.loading.dismiss().then(() => {
            this.loading.dismiss().then(async () => {
              const alert = await this.alertCtrl.create({ message: "Unit Added Successfully", buttons: [{ text: 'Ok', role: 'cancel' }], });
              await alert.present();
              this.addUnitForm.reset();
            });
          });
        }, error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({ message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }], });
            await alert.present();
          });
        });
    }
  }

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
        console.log("The result:", res);
        this.coordinatesInfo.location = res.data.location;
        this.coordinatesInfo.locationString = res.data.location.lat + "," + res.data.location.lng;
      } else {
        console.log("No result:", res);
      }
    });

    await this.modal.present();
  }

}
