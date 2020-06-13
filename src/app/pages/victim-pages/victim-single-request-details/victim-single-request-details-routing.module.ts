import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimSingleRequestDetailsPage } from './victim-single-request-details.page';

const routes: Routes = [
  {
    path: '',
    component: VictimSingleRequestDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimSingleRequestDetailsPageRoutingModule {}
