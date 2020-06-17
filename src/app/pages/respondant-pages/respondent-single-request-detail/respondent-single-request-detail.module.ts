import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondentSingleRequestDetailPageRoutingModule } from './respondent-single-request-detail-routing.module';

import { RespondentSingleRequestDetailPage } from './respondent-single-request-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentSingleRequestDetailPageRoutingModule
  ],
  // declarations: [RespondentSingleRequestDetailPage]
})
export class RespondentSingleRequestDetailPageModule {}
