import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VictimReviewPagePageRoutingModule } from './victim-review-page-routing.module';

import { VictimReviewPagePage } from './victim-review-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimReviewPagePageRoutingModule
  ],
  declarations: [VictimReviewPagePage]
})
export class VictimReviewPagePageModule {}
