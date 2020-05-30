import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimConfirmLocOnMapPageRoutingModule } from './victim-confirm-loc-on-map-routing.module';

import { VictimConfirmLocOnMapPage } from './victim-confirm-loc-on-map.page';
import { ViewDangersPageModule } from '../view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimConfirmLocOnMapPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [VictimConfirmLocOnMapPage]
})
export class VictimConfirmLocOnMapPageModule {}
