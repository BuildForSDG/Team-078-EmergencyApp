import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RespondantMenuModule } from '../../../components/respondant.components.module';
import { RespondentHistoryPageRoutingModule } from './respondent-history-routing.module';
import { RespondentSingleRequestDetailPage } from '../respondent-single-request-detail/respondent-single-request-detail.page';
import { RespondentHistoryPage } from './respondent-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    RespondentHistoryPageRoutingModule
  ],
  declarations: [RespondentHistoryPage,RespondentSingleRequestDetailPage],
  entryComponents: [RespondentSingleRequestDetailPage]
})
export class RespondentHistoryPageModule {}
