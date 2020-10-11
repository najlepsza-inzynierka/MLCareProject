import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStaffDetailsComponent } from './medical-staff-details.component';

describe('MedicalStaffDetailsComponent', () => {
  let component: MedicalStaffDetailsComponent;
  let fixture: ComponentFixture<MedicalStaffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalStaffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
