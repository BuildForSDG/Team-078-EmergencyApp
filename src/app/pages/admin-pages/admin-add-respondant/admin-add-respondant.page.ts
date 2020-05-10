import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-admin-add-respondant',
  templateUrl: './admin-add-respondant.page.html',
  styleUrls: ['./admin-add-respondant.page.scss'],
})
export class AdminAddRespondantPage implements OnInit {
  addReponderCredentials = {email: '', password: '', fullname: '', phone_number: '', address: '',  respondant_type: '', respondant_unit: '', coordinates: ''};
  constructor() { }

  ngOnInit() {
  }
    adminAddResponder(){
  
    return this._auth.addResponder(this.addReponderCredentials.service_type,this.addReponderCredentials.unit_id,this.addReponderCredentials.unit_name,this.addReponderCredentials.unit_number,this.addReponderCredentials.unit_location,this.addReponderCredentials.unit_head);
   
 }
}
