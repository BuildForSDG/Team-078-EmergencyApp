import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';

import { AdminAddDangerPageRoutingModule } from './admin-add-danger-routing.module';

import { AdminAddDangerPage } from './admin-add-danger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    AdminAddDangerPageRoutingModule
  ],
  declarations: [AdminAddDangerPage]
})
export class AdminAddDangerPageModule {}
