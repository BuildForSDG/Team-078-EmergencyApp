import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDangersPageRoutingModule } from './view-dangers-routing.module';

import { ViewDangersPage } from './view-dangers.page';

import	{	GoogleMapComponent	}	from	'../../../components/google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDangersPageRoutingModule
  ],
  declarations: [ViewDangersPage, GoogleMapComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewDangersPageModule {}
