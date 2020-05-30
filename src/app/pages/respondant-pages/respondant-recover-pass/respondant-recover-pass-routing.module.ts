import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondantRecoverPassPage } from './respondant-recover-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RespondantRecoverPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondantRecoverPassPageRoutingModule {}
