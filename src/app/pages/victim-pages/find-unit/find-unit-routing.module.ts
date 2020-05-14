import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindUnitPage } from './find-unit.page';

const routes: Routes = [
  {
    path: '',
    component: FindUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindUnitPageRoutingModule {}
