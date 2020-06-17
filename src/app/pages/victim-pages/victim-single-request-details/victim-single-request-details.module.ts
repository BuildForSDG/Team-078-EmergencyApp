import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimSingleRequestDetailsPageRoutingModule } from './victim-single-request-details-routing.module';

import { VictimSingleRequestDetailsPage } from './victim-single-request-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimSingleRequestDetailsPageRoutingModule
  ],
  // declarations: [VictimSingleRequestDetailsPage]
})
export class VictimSingleRequestDetailsPageModule {}
