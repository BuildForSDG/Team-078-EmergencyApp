import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddRespondantPage } from './admin-add-respondant.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddRespondantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddRespondantPageRoutingModule {}
