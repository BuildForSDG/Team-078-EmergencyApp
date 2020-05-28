import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';

import { AdminVerifyDangerMapPageRoutingModule } from './admin-verify-danger-map-routing.module';

import { AdminVerifyDangerMapPage } from './admin-verify-danger-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    AdminVerifyDangerMapPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [AdminVerifyDangerMapPage]
})
export class AdminVerifyDangerMapPageModule {}
