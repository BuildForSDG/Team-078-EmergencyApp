import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimConfirmLocOnMapPage } from './victim-confirm-loc-on-map.page';

describe('VictimConfirmLocOnMapPage', () => {
  let component: VictimConfirmLocOnMapPage;
  let fixture: ComponentFixture<VictimConfirmLocOnMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimConfirmLocOnMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimConfirmLocOnMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
