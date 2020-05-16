import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

import { ViewEmergenciesPageRoutingModule } from './view-emergencies-routing.module';

import { ViewEmergenciesPage } from './view-emergencies.page';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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




// @Component({
//   selector: 'modal-example',
//   templateUrl: 'modal-example.html',
//   styleUrls: ['./modal-example.css']
// })
// export class ModalExample {
//   constructor(public modalController: ModalController) {

//   }

//   async presentModal() {
//     const modal = await this.modalController.create({
//       component: ModalPage,
//       componentProps: {
//         'firstName': 'Douglas',
//         'lastName': 'Adams',
//         'middleInitial': 'N'
//       }
//     });
//     return await modal.present();
//   }