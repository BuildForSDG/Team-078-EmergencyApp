import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMenuModule } from '../../../components/admin.components.module'

import { AdminAddRespondantPageRoutingModule } from './admin-add-respondant-routing.module';

import { AdminAddRespondantPage } from './admin-add-respondant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMenuModule,
    ReactiveFormsModule,
    AdminAddRespondantPageRoutingModule
  ],
  declarations: [AdminAddRespondantPage]
})
export class AdminAddRespondantPageModule {}
