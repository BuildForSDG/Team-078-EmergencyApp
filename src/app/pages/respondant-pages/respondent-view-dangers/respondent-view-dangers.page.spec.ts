import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondentViewDangersPage } from './respondent-view-dangers.page';

describe('RespondentViewDangersPage', () => {
  let component: RespondentViewDangersPage;
  let fixture: ComponentFixture<RespondentViewDangersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentViewDangersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondentViewDangersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
