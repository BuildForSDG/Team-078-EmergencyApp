import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VictimMenuModule } from '../../../components/victim.components.module'
import { FindUnitPageRoutingModule } from './find-unit-routing.module';
import { FindUnitPage } from './find-unit.page';
import { VictimViewUnitOnMapPage } from '../../victim-pages/victim-view-unit-on-map/victim-view-unit-on-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    FindUnitPageRoutingModule,
    ViewDangersPageModule

  ],
  declarations: [FindUnitPage, VictimViewUnitOnMapPage],
  entryComponents: [VictimViewUnitOnMapPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FindUnitPageModule { }