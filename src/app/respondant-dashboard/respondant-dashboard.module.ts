import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantDashboardPageRoutingModule } from './respondant-dashboard-routing.module';

import { RespondantDashboardPage } from './respondant-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondantDashboardPageRoutingModule
  ],
  declarations: [RespondantDashboardPage]
})
export class RespondantDashboardPageModule {}
