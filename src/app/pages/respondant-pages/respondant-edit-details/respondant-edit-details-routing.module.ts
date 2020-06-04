import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondantEditDetailsPage } from './respondant-edit-details.page';

const routes: Routes = [
  {
    path: '',
    component: RespondantEditDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondantEditDetailsPageRoutingModule {}
