import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetHelpPage } from './get-help.page';

describe('GetHelpPage', () => {
  let component: GetHelpPage;
  let fixture: ComponentFixture<GetHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetHelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
