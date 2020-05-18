import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRespondantListPage } from './view-respondant-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRespondantListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRespondantListPageRoutingModule {}
