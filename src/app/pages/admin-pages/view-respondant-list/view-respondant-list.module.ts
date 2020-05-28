import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdminMenuModule } from '../../../components/admin.components.module';

import { ViewRespondantListPageRoutingModule } from './view-respondant-list-routing.module';


import { ViewRespondantListPage } from './view-respondant-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    ViewRespondantListPageRoutingModule
  ],
  declarations: [ViewRespondantListPage]
})
export class ViewRespondantListPageModule {}
