import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimViewUnitOnMapPage } from './victim-view-unit-on-map.page';

const routes: Routes = [
  {
    path: '',
    component: VictimViewUnitOnMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimViewUnitOnMapPageRoutingModule {}
