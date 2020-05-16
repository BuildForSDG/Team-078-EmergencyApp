import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimConfirmLocOnMapPageRoutingModule } from './victim-confirm-loc-on-map-routing.module';

import { VictimConfirmLocOnMapPage } from './victim-confirm-loc-on-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimConfirmLocOnMapPageRoutingModule
  ],
  declarations: [VictimConfirmLocOnMapPage]
})
export class VictimConfirmLocOnMapPageModule {}
