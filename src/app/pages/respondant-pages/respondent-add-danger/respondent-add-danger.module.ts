import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondantMenuModule } from '../../../components/respondant.components.module';

import { RespondentAddDangerPageRoutingModule } from './respondent-add-danger-routing.module';

import { RespondentAddDangerPage } from './respondent-add-danger.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentAddDangerPageRoutingModule,
    RespondantMenuModule
  ],
  declarations: [RespondentAddDangerPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RespondentAddDangerPageModule {}
