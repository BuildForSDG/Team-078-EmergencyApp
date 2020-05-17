import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetHelpPageRoutingModule } from './get-help-routing.module';

import { GetHelpPage } from './get-help.page';

import { VictimMenuModule } from '../../../components/victim.components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimMenuModule,
    GetHelpPageRoutingModule
  ],
  declarations: [GetHelpPage, VictimMenuModule]
})
export class GetHelpPageModule {}
