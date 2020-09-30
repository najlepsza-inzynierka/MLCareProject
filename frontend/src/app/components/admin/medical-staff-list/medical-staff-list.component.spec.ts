import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStaffListComponent } from './medical-staff-list.component';

describe('MedicalStaffListComponent', () => {
  let component: MedicalStaffListComponent;
  let fixture: ComponentFixture<MedicalStaffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalStaffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
