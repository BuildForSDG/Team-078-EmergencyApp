import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondantLoginPage } from './respondant-login.page';

describe('RespondantLoginPage', () => {
  let component: RespondantLoginPage;
  let fixture: ComponentFixture<RespondantLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondantLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondantLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
