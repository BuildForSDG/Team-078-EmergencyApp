import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminEditAdminPage } from './admin-edit-admin.page';

describe('AdminEditAdminPage', () => {
  let component: AdminEditAdminPage;
  let fixture: ComponentFixture<AdminEditAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
