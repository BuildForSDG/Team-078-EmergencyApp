import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimReviewPagePage } from './victim-review-page.page';

const routes: Routes = [
  {
    path: '',
    component: VictimReviewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimReviewPagePageRoutingModule {}
