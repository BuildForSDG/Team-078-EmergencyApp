import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomPagePageRoutingModule } from './welcom-page-routing.module';

import { WelcomPagePage } from './welcom-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomPagePageRoutingModule
  ],
  declarations: [WelcomPagePage]
})
export class WelcomPagePageModule {}
