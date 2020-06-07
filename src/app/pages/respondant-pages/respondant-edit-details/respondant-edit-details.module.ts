import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantMenuModule } from '../../../components/respondant.components.module'

import { RespondantEditDetailsPageRoutingModule } from './respondant-edit-details-routing.module';

import { RespondantEditDetailsPage } from './respondant-edit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    RespondantEditDetailsPageRoutingModule
  ],
  declarations: [RespondantEditDetailsPage]
})
export class RespondantEditDetailsPageModule {}
