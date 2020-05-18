import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimMenuModule } from '../../../components/victim.components.module'

import { ViewUnitPageRoutingModule } from './view-unit-routing.module';

import { ViewUnitPage } from './view-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    ViewUnitPageRoutingModule
  ],
  declarations: [ViewUnitPage]
})
export class ViewUnitPageModule {}
