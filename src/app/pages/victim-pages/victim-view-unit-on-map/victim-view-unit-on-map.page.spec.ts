import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimViewUnitOnMapPage } from './victim-view-unit-on-map.page';

describe('VictimViewUnitOnMapPage', () => {
  let component: VictimViewUnitOnMapPage;
  let fixture: ComponentFixture<VictimViewUnitOnMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimViewUnitOnMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimViewUnitOnMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
