import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminAddUnitPageRoutingModule } from './admin-add-unit-routing.module';

import { AdminAddUnitPage } from './admin-add-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminAddUnitPageRoutingModule
  ],
  declarations: [AdminAddUnitPage]
})
export class AdminAddUnitPageModule {}
