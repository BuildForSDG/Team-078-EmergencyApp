import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DangerPage } from './danger.page';

describe('DangerPage', () => {
  let component: DangerPage;
  let fixture: ComponentFixture<DangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
