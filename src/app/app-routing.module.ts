import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'welcom-page',
    loadChildren: () => import('./welcom-page/welcom-page.module').then( m => m.WelcomPagePageModule)
  },
  {
    path: 'respondant-login',
    loadChildren: () => import('./respondant-login/respondant-login.module').then( m => m.RespondantLoginPageModule)
  },
  {
    path: 'welcom-page',
    loadChildren: () => import('./welcom-page/welcom-page.module').then( m => m.WelcomPagePageModule)
  },
  {
    path: 'respondant-dashboard',
    loadChildren: () => import('./respondant-dashboard/respondant-dashboard.module').then( m => m.RespondantDashboardPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
