import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';

import { AdminEditUnitPageRoutingModule } from './admin-edit-unit-routing.module';

import { AdminEditUnitPage } from './admin-edit-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    AdminEditUnitPageRoutingModule
  ],
  declarations: [AdminEditUnitPage]
})
export class AdminEditUnitPageModule {}
