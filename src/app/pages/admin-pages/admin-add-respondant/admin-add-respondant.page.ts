import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
@Component({
  selector: 'app-admin-add-respondant',
  templateUrl: './admin-add-respondant.page.html',
  styleUrls: ['./admin-add-respondant.page.scss'],
})
export class AdminAddRespondantPage implements OnInit {
  addReponderCredentials = {email: '', password: '', fullname: '', phone_number: '', address: '',  respondant_type: '', respondant_unit: '', coordinates: ''};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
  adminAddResponder(){
    return this._auth.addResponder(this.addReponderCredentials.email,this.addReponderCredentials.password,this.addReponderCredentials.phone_number,this.addReponderCredentials.address,this.addReponderCredentials.respondant_type,this.addReponderCredentials.respondant_unit,this.addReponderCredentials.coordinates);
  }
}
