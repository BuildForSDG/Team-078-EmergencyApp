import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDangersPage } from './view-dangers.page';

describe('ViewDangersPage', () => {
  let component: ViewDangersPage;
  let fixture: ComponentFixture<ViewDangersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDangersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDangersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
