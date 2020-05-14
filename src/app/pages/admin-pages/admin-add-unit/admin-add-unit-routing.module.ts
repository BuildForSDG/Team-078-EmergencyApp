import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddUnitPage } from './admin-add-unit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddUnitPageRoutingModule {}
