import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDetailsComponent } from './prediction-details.component';

describe('PredictionDetailsComponent', () => {
  let component: PredictionDetailsComponent;
  let fixture: ComponentFixture<PredictionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
