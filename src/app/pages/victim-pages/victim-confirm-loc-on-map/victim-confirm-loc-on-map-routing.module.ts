import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimConfirmLocOnMapPage } from './victim-confirm-loc-on-map.page';

const routes: Routes = [
  {
    path: '',
    component: VictimConfirmLocOnMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimConfirmLocOnMapPageRoutingModule {}
