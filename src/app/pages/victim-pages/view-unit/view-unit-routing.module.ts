import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUnitPage } from './view-unit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUnitPageRoutingModule {}
