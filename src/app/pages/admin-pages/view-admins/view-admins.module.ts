import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';

import { ViewAdminsPageRoutingModule } from './view-admins-routing.module';

import { ViewAdminsPage } from './view-admins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    ViewAdminsPageRoutingModule
  ],
  declarations: [ViewAdminsPage]
})
export class ViewAdminsPageModule {}

export const adminList = [
  {
    ID: '093090',
    Name: 'Mon 3 Jun, 2020',
    Email: 'Anambra'
  }
];