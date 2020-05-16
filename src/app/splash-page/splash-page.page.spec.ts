import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplashPagePage } from './splash-page.page';

describe('SplashPagePage', () => {
  let component: SplashPagePage;
  let fixture: ComponentFixture<SplashPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
