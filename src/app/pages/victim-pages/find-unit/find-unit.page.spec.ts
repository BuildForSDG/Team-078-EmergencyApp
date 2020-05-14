import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindUnitPage } from './find-unit.page';

describe('FindUnitPage', () => {
  let component: FindUnitPage;
  let fixture: ComponentFixture<FindUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUnitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
