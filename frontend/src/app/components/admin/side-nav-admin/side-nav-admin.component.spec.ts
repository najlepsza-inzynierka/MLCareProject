import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavAdminComponent } from './side-nav-admin.component';

describe('SideNavAdminComponent', () => {
  let component: SideNavAdminComponent;
  let fixture: ComponentFixture<SideNavAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
