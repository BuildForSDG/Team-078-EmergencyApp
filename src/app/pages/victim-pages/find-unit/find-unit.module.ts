import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindUnitPageRoutingModule } from './find-unit-routing.module';

import { FindUnitPage } from './find-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindUnitPageRoutingModule
  ],
  declarations: [FindUnitPage]
})
export class FindUnitPageModule {}
