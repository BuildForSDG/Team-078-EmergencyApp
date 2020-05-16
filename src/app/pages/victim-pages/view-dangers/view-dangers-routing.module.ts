import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDangersPage } from './view-dangers.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDangersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDangersPageRoutingModule {}
