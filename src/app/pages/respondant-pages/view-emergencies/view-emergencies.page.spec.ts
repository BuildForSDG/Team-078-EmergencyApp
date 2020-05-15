import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewEmergenciesPage } from './view-emergencies.page';

describe('ViewEmergenciesPage', () => {
  let component: ViewEmergenciesPage;
  let fixture: ComponentFixture<ViewEmergenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmergenciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEmergenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
