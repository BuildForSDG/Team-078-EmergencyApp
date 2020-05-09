import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantLoginPageRoutingModule } from './respondant-login-routing.module';

import { RespondantLoginPage } from './respondant-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantLoginPageRoutingModule
  ],
  declarations: [RespondantLoginPage]
})
export class RespondantLoginPageModule {}
