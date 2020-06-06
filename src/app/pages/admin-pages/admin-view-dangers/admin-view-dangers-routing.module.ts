import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminViewDangersPage } from './admin-view-dangers.page';

const routes: Routes = [
  {
    path: '',
    component: AdminViewDangersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminViewDangersPageRoutingModule {}
