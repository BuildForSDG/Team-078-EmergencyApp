import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditAdminPage } from './admin-edit-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditAdminPageRoutingModule {}
