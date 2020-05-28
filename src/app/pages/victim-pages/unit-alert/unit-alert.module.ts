import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VictimBlueMenuModule } from '../../../components/victimblue.components.module';

import { UnitAlertPageRoutingModule } from './unit-alert-routing.module';

import { UnitAlertPage } from './unit-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimBlueMenuModule,
    UnitAlertPageRoutingModule
  ],
  declarations: [UnitAlertPage]
})
export class UnitAlertPageModule {}
