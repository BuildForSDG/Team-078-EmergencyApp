import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentHistoryPage } from './respondent-history.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentHistoryPageRoutingModule {}
