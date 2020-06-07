import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RespondentViewRequestOnMapPageRoutingModule } from './respondent-view-request-on-map-routing.module';
import { RespondentViewRequestOnMapPage } from './respondent-view-request-on-map.page';
import { ViewDangersPageModule } from '../../victim-pages/view-dangers/view-dangers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespondentViewRequestOnMapPageRoutingModule,
    ViewDangersPageModule
  ],
  declarations: [RespondentViewRequestOnMapPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RespondentViewRequestOnMapPageModule {}
