import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUnitPageRoutingModule } from './view-unit-routing.module';

import { ViewUnitPage } from './view-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUnitPageRoutingModule
  ],
  declarations: [ViewUnitPage]
})
export class ViewUnitPageModule {}
