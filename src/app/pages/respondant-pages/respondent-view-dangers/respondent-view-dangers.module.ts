import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RespondantMenuModule } from '../../../components/respondant.components.module';
import { RespondentViewDangersPageRoutingModule } from './respondent-view-dangers-routing.module';
import { RespondentViewDangersPage } from './respondent-view-dangers.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentViewDangersPageRoutingModule,
    RespondantMenuModule,
    ViewDangersPageModule
  ],
  declarations: [RespondentViewDangersPage]
})
export class RespondentViewDangersPageModule {}
