import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalStaffComponent } from './edit-medical-staff.component';

describe('EditMedicalStaffComponent', () => {
  let component: EditMedicalStaffComponent;
  let fixture: ComponentFixture<EditMedicalStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicalStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
