import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentAddDangerPage } from './respondent-add-danger.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentAddDangerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentAddDangerPageRoutingModule {}
