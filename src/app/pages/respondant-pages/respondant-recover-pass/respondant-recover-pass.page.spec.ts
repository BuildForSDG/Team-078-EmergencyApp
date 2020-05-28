import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondantRecoverPassPage } from './respondant-recover-pass.page';

describe('RespondantRecoverPassPage', () => {
  let component: RespondantRecoverPassPage;
  let fixture: ComponentFixture<RespondantRecoverPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondantRecoverPassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondantRecoverPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
