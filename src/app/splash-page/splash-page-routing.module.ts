import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashPagePage } from './splash-page.page';

const routes: Routes = [
  {
    path: '',
    component: SplashPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashPagePageRoutingModule {}
