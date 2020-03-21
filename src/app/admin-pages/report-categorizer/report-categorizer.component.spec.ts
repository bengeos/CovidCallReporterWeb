import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategorizerComponent } from './report-categorizer.component';

describe('ReportCategorizerComponent', () => {
  let component: ReportCategorizerComponent;
  let fixture: ComponentFixture<ReportCategorizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCategorizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCategorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
