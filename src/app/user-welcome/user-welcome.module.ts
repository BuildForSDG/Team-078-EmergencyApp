import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserWelcomePageRoutingModule } from './user-welcome-routing.module';

import { UserWelcomePage } from './user-welcome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserWelcomePageRoutingModule
  ],
  declarations: [UserWelcomePage]
})
export class UserWelcomePageModule {}
