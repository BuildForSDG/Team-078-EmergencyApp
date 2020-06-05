import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';


import { AdminAddUnitPageRoutingModule } from './admin-add-unit-routing.module';
import { AddRespondantCoordinatesPageModule } from "../add-respondant-coordinates/add-respondant-coordinates.module";

import { AdminAddUnitPage } from './admin-add-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    ReactiveFormsModule,
    AdminAddUnitPageRoutingModule,
    AddRespondantCoordinatesPageModule
  ],
  declarations: [AdminAddUnitPage]
})
export class AdminAddUnitPageModule {}
