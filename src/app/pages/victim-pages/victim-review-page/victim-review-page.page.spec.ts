import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimReviewPagePage } from './victim-review-page.page';

describe('VictimReviewPagePage', () => {
  let component: VictimReviewPagePage;
  let fixture: ComponentFixture<VictimReviewPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimReviewPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimReviewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
