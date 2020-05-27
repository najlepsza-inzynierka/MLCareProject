import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDiseaseDialogComponent } from './pick-disease-dialog.component';

describe('PickDiseaseDialogComponent', () => {
  let component: PickDiseaseDialogComponent;
  let fixture: ComponentFixture<PickDiseaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDiseaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDiseaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
