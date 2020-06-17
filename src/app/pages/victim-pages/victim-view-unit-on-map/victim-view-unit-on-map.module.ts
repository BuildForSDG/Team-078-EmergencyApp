import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VictimViewUnitOnMapPageRoutingModule } from './victim-view-unit-on-map-routing.module';
import { VictimViewUnitOnMapPage } from './victim-view-unit-on-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimViewUnitOnMapPageRoutingModule,
    ViewDangersPageModule
  ],
  // declarations: [VictimViewUnitOnMapPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VictimViewUnitOnMapPageModule {}
