import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminAddDangerPage } from './admin-add-danger.page';

describe('AdminAddDangerPage', () => {
  let component: AdminAddDangerPage;
  let fixture: ComponentFixture<AdminAddDangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddDangerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddDangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
