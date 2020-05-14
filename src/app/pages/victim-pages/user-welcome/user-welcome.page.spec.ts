import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserWelcomePage } from './user-welcome.page';

describe('UserWelcomePage', () => {
  let component: UserWelcomePage;
  let fixture: ComponentFixture<UserWelcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWelcomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserWelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
