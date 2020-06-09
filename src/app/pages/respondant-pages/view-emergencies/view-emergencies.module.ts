import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';import { RespondantMenuModule } from '../../../components/respondant.components.module'
import { ViewEmergenciesPageRoutingModule } from './view-emergencies-routing.module';
import { ViewEmergenciesPage } from './view-emergencies.page';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';
import { RespondentViewRequestOnMapPage } from '../respondent-view-request-on-map/respondent-view-request-on-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    ViewEmergenciesPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [ViewEmergenciesPage, EmergencyDetailsPage,RespondentViewRequestOnMapPage],
  entryComponents: [EmergencyDetailsPage,RespondentViewRequestOnMapPage]
})
export class ViewEmergenciesPageModule {}


export const emergencyList = [
  {
    Number: '093090',
    Date: 'Mon 3 Jun, 2020',
    Location: 'Anambra'
  }
];
