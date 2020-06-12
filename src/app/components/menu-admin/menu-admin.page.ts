import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage implements OnInit {
  pages: [
    {
      title: 'admin-dashboard';
      url: '../../pages/admin-pages/admin-dashboard/admin-dashboard.module';
    },
    {
      title: 'admin-login';
      url: '../../pages/admin-pages/admin-login/admin-login.module';
    },
    {
      title: 'admin-add-respondant';
      url: '../../pages/admin-pages/admin-add-respondant/admin-add-respondant.module';
    },
    {
      title: 'admin-add-unit';
      url: '../../pages/admin-pages/admin-add-unit/admin-add-unit.module';
    },
    {
      title: 'admin-add-danger';
      url: '../../pages/admin-pages/admin-add-danger/admin-add-danger.module';
    },
    {
      title: 'admin-edit-unit';
      url: '../../pages/admin-pages/admin-edit-unit/admin-edit-unit.module';
    },
    {
      title: 'view-respondant-list';
      url: '../../pages/admin-pages/view-respondant-list/view-respondant-list.module';
    },
    {
      title: 'view-admins';
      url: '../../pages/admin-pages/view-admins/view-admins.module';
    },
    {
      title: 'admin-view-dangers';
      url: '../../pages/admin-pages/admin-view-dangers/admin-view-dangers.module';
    }
  ];

  selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {}
}
