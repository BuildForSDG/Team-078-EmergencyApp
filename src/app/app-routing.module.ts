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
<<<<<<< HEAD
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }, {
    path: 'admin-sign-up',
    loadChildren: () => import('./pages/admin-pages/admin-sign-up/admin-sign-up.module').then( m => m.AdminSignUpPageModule)
  },
  {
    path: 'danger',
    loadChildren: () => import('./pages/admin-pages/danger/danger.module').then( m => m.DangerPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/admin-pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/admin-pages/search/search.module').then( m => m.SearchPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
=======
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
>>>>>>> 5ef9b7e01edcce35a48c92ea10406bee8e749744
