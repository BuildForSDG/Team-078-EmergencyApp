import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VictimBlueMenuModule } from '../../../components/victimblue.components.module';

import { ViewDangersPageRoutingModule } from './view-dangers-routing.module';

import { ViewDangersPage } from './view-dangers.page';

import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';
import	{	GooglePlacesComponent	}	from	'../../../components/google-places/google-places.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimBlueMenuModule,
    ViewDangersPageRoutingModule
  ],
  declarations: [ViewDangersPage, GoogleMapComponent, GooglePlacesComponent],
  exports:[GoogleMapComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewDangersPageModule {}
