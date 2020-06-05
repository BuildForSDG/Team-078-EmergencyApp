import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondentBackMenuModule } from '../../../components/respondentback.components.module'

import { RespondantRecoverPassPageRoutingModule } from './respondant-recover-pass-routing.module';

import { RespondantRecoverPassPage } from './respondant-recover-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentBackMenuModule,
    RespondantRecoverPassPageRoutingModule
  ],
  declarations: [RespondantRecoverPassPage]
})
export class RespondantRecoverPassPageModule {}
