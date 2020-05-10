import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminAddRespondantPage } from './admin-add-respondant.page';

describe('AdminAddRespondantPage', () => {
  let component: AdminAddRespondantPage;
  let fixture: ComponentFixture<AdminAddRespondantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddRespondantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddRespondantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
