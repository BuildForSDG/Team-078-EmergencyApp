import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RespondentBackMenuComponent } from './respondent-back-menu/respondent-back-menu.component';


@NgModule({
  declarations: [RespondentBackMenuComponent],
    exports: [RespondentBackMenuComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
})
export class RespondentBackMenuModule {}
