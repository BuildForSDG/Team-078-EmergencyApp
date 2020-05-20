import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRespondantCoordinatesPageRoutingModule } from './add-respondant-coordinates-routing.module';

import { AddRespondantCoordinatesPage } from './add-respondant-coordinates.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRespondantCoordinatesPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [AddRespondantCoordinatesPage]
})
export class AddRespondantCoordinatesPageModule {}
