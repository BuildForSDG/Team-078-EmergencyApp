import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRespondantListPage } from './view-respondant-list.page';

describe('ViewRespondantListPage', () => {
  let component: ViewRespondantListPage;
  let fixture: ComponentFixture<ViewRespondantListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRespondantListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRespondantListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
