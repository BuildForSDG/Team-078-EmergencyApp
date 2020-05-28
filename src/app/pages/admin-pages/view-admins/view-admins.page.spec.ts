import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAdminsPage } from './view-admins.page';

describe('ViewAdminsPage', () => {
  let component: ViewAdminsPage;
  let fixture: ComponentFixture<ViewAdminsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAdminsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
