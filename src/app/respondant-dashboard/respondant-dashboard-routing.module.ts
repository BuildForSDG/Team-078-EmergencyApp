import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondantDashboardPage } from './respondant-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: RespondantDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondantDashboardPageRoutingModule {}
