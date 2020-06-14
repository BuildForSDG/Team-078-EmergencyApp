import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentSingleRequestDetailPage } from './respondent-single-request-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentSingleRequestDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentSingleRequestDetailPageRoutingModule {}
