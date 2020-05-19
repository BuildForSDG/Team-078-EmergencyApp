import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditUnitPage } from './admin-edit-unit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditUnitPageRoutingModule {}
