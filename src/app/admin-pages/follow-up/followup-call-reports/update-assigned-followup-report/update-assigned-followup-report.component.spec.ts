import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignedFollowupReportComponent } from './update-assigned-followup-report.component';

describe('UpdateAssignedFollowupReportComponent', () => {
  let component: UpdateAssignedFollowupReportComponent;
  let fixture: ComponentFixture<UpdateAssignedFollowupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssignedFollowupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignedFollowupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
