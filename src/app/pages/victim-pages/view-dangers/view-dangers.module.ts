import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VictimMenuModule } from '../../../components/victim.components.module';

import { ViewDangersPageRoutingModule } from './view-dangers-routing.module';

import { ViewDangersPage } from './view-dangers.page';

import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';
import	{	GooglePlacesComponent	}	from	'../../../components/google-places/google-places.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    ViewDangersPageRoutingModule
  ],
  declarations: [ViewDangersPage, GoogleMapComponent, GooglePlacesComponent],
  exports:[GoogleMapComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewDangersPageModule {}
