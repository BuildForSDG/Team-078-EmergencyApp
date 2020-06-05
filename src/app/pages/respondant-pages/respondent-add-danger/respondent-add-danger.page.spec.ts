import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondentAddDangerPage } from './respondent-add-danger.page';

describe('RespondentAddDangerPage', () => {
  let component: RespondentAddDangerPage;
  let fixture: ComponentFixture<RespondentAddDangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentAddDangerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondentAddDangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
