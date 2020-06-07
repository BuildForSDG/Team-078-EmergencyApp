import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminViewDangersPageRoutingModule } from './admin-view-dangers-routing.module';
import { AdminViewDangersPage } from './admin-view-dangers.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminViewDangersPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [AdminViewDangersPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminViewDangersPageModule { }
