import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondentViewRequestOnMapPage } from './respondent-view-request-on-map.page';

const routes: Routes = [
  {
    path: '',
    component: RespondentViewRequestOnMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondentViewRequestOnMapPageRoutingModule {}
