import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAdminsPage } from './view-admins.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAdminsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAdminsPageRoutingModule {}
