import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuAdminPageRoutingModule } from './menu-admin-routing.module';

import { MenuAdminPage } from './menu-admin.page';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-dashboard/admin-dashboard.module'
      ).then((m) => m.AdminDashboardPageModule),
  },
  {
    path: 'admin-login',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-login/admin-login.module'
      ).then((m) => m.AdminLoginPageModule),
  },
  {
    path: 'admin-add-respondant',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-add-respondant/admin-add-respondant.module'
      ).then(
        (m) => m.AdminAddRespondantPageModule
      ),
  },
  {
    path: 'admin-add-unit',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-add-unit/admin-add-unit.module'
      ).then((m) => m.AdminAddUnitPageModule),
  },
  {
    path: 'admin-add-danger',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-verify-danger-map/admin-verify-danger-map.module'
      ).then(
        (m) => m.AdminVerifyDangerMapPageModule
      ),
  },
  {
    path: 'admin-edit-unit',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-edit-unit/admin-edit-unit.module'
      ).then((m) => m.AdminEditUnitPageModule),
  },
  {
    path: 'view-respondant-list',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/view-respondant-list/view-respondant-list.module'
      ).then(
        (m) => m.ViewRespondantListPageModule
      ),
  },
  {
    path: 'view-admins',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/view-admins/view-admins.module'
      ).then((m) => m.ViewAdminsPageModule),
  },
  {
    path: 'admin-view-dangers',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-view-dangers/admin-view-dangers.module'
      ).then((m) => m.AdminViewDangersPageModule),
  },

  {
    path: '',
    loadChildren: () =>
      import(
        '../../pages/admin-pages/admin-login/admin-login.module'
      ).then((m) => m.AdminLoginPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdminPageRoutingModule
  ],
  declarations: [MenuAdminPage]
})
export class MenuAdminPageModule {}
