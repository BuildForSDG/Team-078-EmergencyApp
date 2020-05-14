import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantLoginPageRoutingModule } from './respondant-login-routing.module';

import { RespondantLoginPage } from './respondant-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RespondantLoginPageRoutingModule
  ],
  declarations: [RespondantLoginPage]
})
export class RespondantLoginPageModule {}
