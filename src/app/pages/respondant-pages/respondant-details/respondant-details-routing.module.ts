import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondantDetailsPage } from './respondant-details.page';

const routes: Routes = [
  {
    path: '',
    component: RespondantDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondantDetailsPageRoutingModule {}
