import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetHelpPage } from './get-help.page';

const routes: Routes = [
  {
    path: '',
    component: GetHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetHelpPageRoutingModule {}
