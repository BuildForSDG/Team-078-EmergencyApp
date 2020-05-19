import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimMenuModule } from '../../../components/victim.components.module'

import { FindUnitPageRoutingModule } from './find-unit-routing.module';

import { FindUnitPage } from './find-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    FindUnitPageRoutingModule
  ],
  declarations: [FindUnitPage]
})
export class FindUnitPageModule {}
