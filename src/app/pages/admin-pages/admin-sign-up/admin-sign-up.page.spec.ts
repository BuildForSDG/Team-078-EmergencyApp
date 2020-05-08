import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminSignUpPage } from './admin-sign-up.page';

describe('AdminSignUpPage', () => {
  let component: AdminSignUpPage;
  let fixture: ComponentFixture<AdminSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
