import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyDetailsPage } from './emergency-details.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyDetailsPageRoutingModule {}
