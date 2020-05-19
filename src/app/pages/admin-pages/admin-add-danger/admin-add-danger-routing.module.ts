import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddDangerPage } from './admin-add-danger.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddDangerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddDangerPageRoutingModule {}
