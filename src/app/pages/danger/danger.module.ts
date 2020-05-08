import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DangerPageRoutingModule } from './danger-routing.module';

import { DangerPage } from './danger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DangerPageRoutingModule
  ],
  declarations: [DangerPage]
})
export class DangerPageModule {}
