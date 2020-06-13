import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimSingleRequestDetailsPage } from './victim-single-request-details.page';

describe('VictimSingleRequestDetailsPage', () => {
  let component: VictimSingleRequestDetailsPage;
  let fixture: ComponentFixture<VictimSingleRequestDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimSingleRequestDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimSingleRequestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
