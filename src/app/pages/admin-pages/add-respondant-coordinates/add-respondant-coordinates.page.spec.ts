import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRespondantCoordinatesPage } from './add-respondant-coordinates.page';

describe('AddRespondantCoordinatesPage', () => {
  let component: AddRespondantCoordinatesPage;
  let fixture: ComponentFixture<AddRespondantCoordinatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRespondantCoordinatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRespondantCoordinatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
