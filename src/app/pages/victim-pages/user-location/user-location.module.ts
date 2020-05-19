import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimMenuModule } from '../../../components/victim.components.module'

import { UserLocationPageRoutingModule } from './user-location-routing.module';

import { UserLocationPage } from './user-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    UserLocationPageRoutingModule
  ],
  declarations: [UserLocationPage]
})
export class UserLocationPageModule {}
