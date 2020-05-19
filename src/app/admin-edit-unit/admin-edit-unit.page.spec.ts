import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminEditUnitPage } from './admin-edit-unit.page';

describe('AdminEditUnitPage', () => {
  let component: AdminEditUnitPage;
  let fixture: ComponentFixture<AdminEditUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditUnitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
