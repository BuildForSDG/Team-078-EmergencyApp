import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitAlertPage } from './unit-alert.page';

const routes: Routes = [
  {
    path: '',
    component: UnitAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitAlertPageRoutingModule {}
