import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPredictionComponent } from './add-prediction.component';

describe('AddPredictionComponent', () => {
  let component: AddPredictionComponent;
  let fixture: ComponentFixture<AddPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
