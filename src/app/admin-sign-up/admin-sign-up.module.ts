import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSignUpPageRoutingModule } from './admin-sign-up-routing.module';

import { AdminSignUpPage } from './admin-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSignUpPageRoutingModule
  ],
  declarations: [AdminSignUpPage]
})
export class AdminSignUpPageModule {}
