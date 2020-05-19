import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimBlueMenuModule } from '../../../components/victimblue.components.module'

import { ViewUnitPageRoutingModule } from './view-unit-routing.module';

import { ViewUnitPage } from './view-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimBlueMenuModule,
    ViewUnitPageRoutingModule
  ],
  declarations: [ViewUnitPage]
})
export class ViewUnitPageModule {}
