import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router'

import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:
      './welcom-page/welcom-page.module',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminMenuComponent,
    children: [
      {
        path: 'admin-add-danger',
        loadChildren:
          './pages/admin-pages/admin-verify-danger-map/admin-verify-danger-map.module',
      },
      {
        path: 'view-respondant-list',
        loadChildren:
          './pages/admin-pages/view-respondant-list/view-respondant-list.module',
      },
      {
        path: 'admin-add-respondant',
        loadChildren:
          './pages/admin-pages/admin-add-respondant/admin-add-respondant.module',
      },
      {
        path: 'admin-add-unit',
        loadChildren:
          './pages/admin-pages/admin-add-unit/admin-add-unit.module',
      },
      {
        path: 'admin-view-dangers',
        loadChildren:
          './pages/admin-pages/admin-view-dangers/admin-view-dangers.module',
      },
      {
        path: 'view-admins',
        loadChildren:
          './pages/admin-pages/view-admins/view-admins.module',
      },
    ],
  },
];

@NgModule({
  declarations: [AdminMenuComponent],
  exports: [AdminMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminMenuModule {}