import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLocationPage } from './user-location.page';

const routes: Routes = [
  {
    path: '',
    component: UserLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLocationPageRoutingModule {}
