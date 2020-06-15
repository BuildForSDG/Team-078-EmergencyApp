import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimRequestHistoryPage } from './victim-request-history.page';

const routes: Routes = [
  {
    path: '',
    component: VictimRequestHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimRequestHistoryPageRoutingModule {}
