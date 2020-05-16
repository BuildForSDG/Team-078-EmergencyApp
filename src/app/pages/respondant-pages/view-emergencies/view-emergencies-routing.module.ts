import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEmergenciesPage } from './view-emergencies.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEmergenciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEmergenciesPageRoutingModule {}
