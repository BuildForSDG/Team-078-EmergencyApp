import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AdminMenuComponent } from '../components/admin-menu/admin-menu.component';

@NgModule({
    declarations: [AdminMenuComponent],
    exports: [AdminMenuComponent, RouterModule],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
})
export class AdminMenuModule {}