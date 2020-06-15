import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RespondantMenuComponent } from '../components/respondant-menu/respondant-menu.component';

@NgModule({
    declarations: [RespondantMenuComponent],
    exports: [RespondantMenuComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
})
export class RespondantMenuModule {}