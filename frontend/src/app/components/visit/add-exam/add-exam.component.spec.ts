import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamComponent } from './add-exam.component';

describe('AddExamComponent', () => {
  let component: AddExamComponent;
  let fixture: ComponentFixture<AddExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
