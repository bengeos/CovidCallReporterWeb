import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityReportsComponent } from './community-reports.component';

describe('CommunityReportsComponent', () => {
  let component: CommunityReportsComponent;
  let fixture: ComponentFixture<CommunityReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
