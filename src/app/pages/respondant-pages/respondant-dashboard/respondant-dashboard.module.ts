import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantMenuModule } from '../../../components/respondant.components.module';

import { RespondantDashboardPageRoutingModule } from './respondant-dashboard-routing.module';

import { RespondantDashboardPage } from './respondant-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantMenuModule,
    RespondantDashboardPageRoutingModule
  ],
  declarations: [RespondantDashboardPage]
})
export class RespondantDashboardPageModule {}
