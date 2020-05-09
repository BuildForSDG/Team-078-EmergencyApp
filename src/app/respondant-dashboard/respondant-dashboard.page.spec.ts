import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondantDashboardPage } from './respondant-dashboard.page';

describe('RespondantDashboardPage', () => {
  let component: RespondantDashboardPage;
  let fixture: ComponentFixture<RespondantDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondantDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondantDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
