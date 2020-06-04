import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantMenuModule } from '../../../components/respondant.components.module';

import { RespondantDetailsPageRoutingModule } from './respondant-details-routing.module';

import { RespondantDetailsPage } from './respondant-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    RespondantDetailsPageRoutingModule
  ],
  declarations: [RespondantDetailsPage]
})
export class RespondantDetailsPageModule {}
