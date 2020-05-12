import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewUnitPage } from './view-unit.page';

describe('ViewUnitPage', () => {
  let component: ViewUnitPage;
  let fixture: ComponentFixture<ViewUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
