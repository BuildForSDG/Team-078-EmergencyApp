import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitAlertPage } from './unit-alert.page';

describe('UnitAlertPage', () => {
  let component: UnitAlertPage;
  let fixture: ComponentFixture<UnitAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
