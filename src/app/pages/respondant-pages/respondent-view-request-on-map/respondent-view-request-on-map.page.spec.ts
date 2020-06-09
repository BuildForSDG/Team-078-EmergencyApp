import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondentViewRequestOnMapPage } from './respondent-view-request-on-map.page';

describe('RespondentViewRequestOnMapPage', () => {
  let component: RespondentViewRequestOnMapPage;
  let fixture: ComponentFixture<RespondentViewRequestOnMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentViewRequestOnMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondentViewRequestOnMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
