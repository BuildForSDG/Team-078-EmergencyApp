import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RespondantMenuModule } from '../../../components/respondant.components.module'
import { ViewEmergenciesPageRoutingModule } from './view-emergencies-routing.module';
import { ViewEmergenciesPage } from './view-emergencies.page';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';
//import { RespondentViewRequestOnMapPage } from '../respondent-view-request-on-map/respondent-view-request-on-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';
import { RespondentViewRequestOnMapPage } from '../respondent-view-request-on-map/respondent-view-request-on-map.page';

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
  entryComponents: [EmergencyDetailsPage,RespondentViewRequestOnMapPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewEmergenciesPageModule {}

