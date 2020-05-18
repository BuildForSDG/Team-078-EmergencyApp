import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminVerifyDangerMapPage } from './admin-verify-danger-map.page';

const routes: Routes = [
  {
    path: '',
    component: AdminVerifyDangerMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminVerifyDangerMapPageRoutingModule {}
