import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-admin-add-unit',
  templateUrl: './admin-add-unit.page.html',
  styleUrls: ['./admin-add-unit.page.scss'],
})
export class AdminAddUnitPage implements OnInit {
  addUnitForm: FormGroup;

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
  constructor( public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, private _auth: AuthService,) { 
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
      this.addUnitForm.get("coordinates").value).then( () => { 
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
      } );
    }
  }

}
