import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantMenuModule } from '../../../components/respondant.components.module';

import { RespondentAddDangerPageRoutingModule } from './respondent-add-danger-routing.module';

import { RespondentAddDangerPage } from './respondent-add-danger.page';

import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentAddDangerPageRoutingModule,
    RespondantMenuModule,
    ViewDangersPageModule
  ],
  declarations: [RespondentAddDangerPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RespondentAddDangerPageModule {}
