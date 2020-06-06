import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminViewDangersPage } from './admin-view-dangers.page';

describe('AdminViewDangersPage', () => {
  let component: AdminViewDangersPage;
  let fixture: ComponentFixture<AdminViewDangersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewDangersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminViewDangersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
