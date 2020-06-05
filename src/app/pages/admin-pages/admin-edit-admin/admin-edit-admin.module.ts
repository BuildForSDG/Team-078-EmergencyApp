import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMenuModule } from '../../../components/admin.components.module';

import { AdminEditAdminPageRoutingModule } from './admin-edit-admin-routing.module';

import { AdminEditAdminPage } from './admin-edit-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    AdminEditAdminPageRoutingModule
  ],
  declarations: [AdminEditAdminPage]
})
export class AdminEditAdminPageModule {}
