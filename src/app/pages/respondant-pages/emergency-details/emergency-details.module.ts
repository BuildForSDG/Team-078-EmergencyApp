import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmergencyDetailsPageRoutingModule } from './emergency-details-routing.module';
//import { RespondentViewRequestOnMapPage } from '../respondent-view-request-on-map/respondent-view-request-on-map.page';
//import { EmergencyDetailsPage } from './emergency-details.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyDetailsPageRoutingModule,
    ViewDangersPageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmergencyDetailsPageModule {}
