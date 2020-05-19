import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminVerifyDangerMapPage } from './admin-verify-danger-map.page';

describe('AdminVerifyDangerMapPage', () => {
  let component: AdminVerifyDangerMapPage;
  let fixture: ComponentFixture<AdminVerifyDangerMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVerifyDangerMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVerifyDangerMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
