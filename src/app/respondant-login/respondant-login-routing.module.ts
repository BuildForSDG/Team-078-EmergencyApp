import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondantLoginPage } from './respondant-login.page';

const routes: Routes = [
  {
    path: '',
    component: RespondantLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondantLoginPageRoutingModule {}
