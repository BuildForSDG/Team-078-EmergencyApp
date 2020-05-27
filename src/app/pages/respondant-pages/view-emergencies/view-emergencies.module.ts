import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';import { RespondantMenuModule } from '../../../components/respondant.components.module'

import { ViewEmergenciesPageRoutingModule } from './view-emergencies-routing.module';

import { ViewEmergenciesPage } from './view-emergencies.page';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    ViewEmergenciesPageRoutingModule
  ],
  declarations: [ViewEmergenciesPage, EmergencyDetailsPage],
  entryComponents: [EmergencyDetailsPage] 
})
export class ViewEmergenciesPageModule {}


export const emergencyList = [
  {
    'Number': '093090',
    'Date': 'Mon 3 Jun, 2020',
    'Location': 'Anambra'
  }
];
