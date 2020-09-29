import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalStaffComponent } from './add-medical-staff.component';

describe('AddMedicalStaffComponent', () => {
  let component: AddMedicalStaffComponent;
  let fixture: ComponentFixture<AddMedicalStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicalStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
