import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VictimRequestHistoryPageRoutingModule } from './victim-request-history-routing.module';
import { VictimSingleRequestDetailsPage } from '../victim-single-request-details/victim-single-request-details.page';
import { VictimRequestHistoryPage } from './victim-request-history.page';
import { VictimReviewPagePage } from '../victim-review-page/victim-review-page.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimRequestHistoryPageRoutingModule,
    
  ],
  declarations: [VictimRequestHistoryPage, VictimSingleRequestDetailsPage,VictimReviewPagePage],
  entryComponents: [VictimSingleRequestDetailsPage,VictimReviewPagePage]

})
export class VictimRequestHistoryPageModule {}
