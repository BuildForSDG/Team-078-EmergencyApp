import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { VictimMenuComponent } from '../components/victim-menu/victim-menu.component'

@NgModule({
  declarations: [VictimMenuComponent],
  exports: [VictimMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],

})
export class VictimMenuModule {}