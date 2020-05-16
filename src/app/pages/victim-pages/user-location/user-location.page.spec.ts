import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserLocationPage } from './user-location.page';

describe('UserLocationPage', () => {
  let component: UserLocationPage;
  let fixture: ComponentFixture<UserLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
