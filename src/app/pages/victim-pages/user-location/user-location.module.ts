import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserLocationPageRoutingModule } from './user-location-routing.module';

import { UserLocationPage } from './user-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLocationPageRoutingModule
  ],
  declarations: [UserLocationPage]
})
export class UserLocationPageModule {}
