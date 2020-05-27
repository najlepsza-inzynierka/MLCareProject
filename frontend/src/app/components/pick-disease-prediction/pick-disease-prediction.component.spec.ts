import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDiseasePredictionComponent } from './pick-disease-prediction.component';

describe('PickDiseasePredictionComponent', () => {
  let component: PickDiseasePredictionComponent;
  let fixture: ComponentFixture<PickDiseasePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDiseasePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDiseasePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
