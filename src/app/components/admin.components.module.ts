import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';

@NgModule({
    declarations: [AdminMenuComponent],
    exports: [AdminMenuComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminMenuModule {}