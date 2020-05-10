import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddRespondantPageRoutingModule } from './admin-add-respondant-routing.module';

import { AdminAddRespondantPage } from './admin-add-respondant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddRespondantPageRoutingModule
  ],
  declarations: [AdminAddRespondantPage]
})
export class AdminAddRespondantPageModule {}
