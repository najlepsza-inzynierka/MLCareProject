import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamComponent } from './edit-exam.component';

describe('EditExamComponent', () => {
  let component: EditExamComponent;
  let fixture: ComponentFixture<EditExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
