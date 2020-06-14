import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondentSingleRequestDetailPage } from './respondent-single-request-detail.page';

describe('RespondentSingleRequestDetailPage', () => {
  let component: RespondentSingleRequestDetailPage;
  let fixture: ComponentFixture<RespondentSingleRequestDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentSingleRequestDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondentSingleRequestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
