import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSignUpPage } from './admin-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSignUpPageRoutingModule {}
