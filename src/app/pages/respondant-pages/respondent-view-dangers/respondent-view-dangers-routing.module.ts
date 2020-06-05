import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentViewDangersPage } from './respondent-view-dangers.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentViewDangersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentViewDangersPageRoutingModule {}
