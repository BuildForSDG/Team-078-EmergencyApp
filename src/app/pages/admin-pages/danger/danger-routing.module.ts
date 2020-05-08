import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DangerPage } from './danger.page';

const routes: Routes = [
  {
    path: '',
    component: DangerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DangerPageRoutingModule {}
