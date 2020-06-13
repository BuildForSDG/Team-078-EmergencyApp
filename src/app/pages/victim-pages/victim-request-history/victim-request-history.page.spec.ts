import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimRequestHistoryPage } from './victim-request-history.page';

describe('VictimRequestHistoryPage', () => {
  let component: VictimRequestHistoryPage;
  let fixture: ComponentFixture<VictimRequestHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimRequestHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimRequestHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
