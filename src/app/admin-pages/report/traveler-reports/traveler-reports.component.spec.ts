import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerReportsComponent } from './traveler-reports.component';

describe('TravelerReportsComponent', () => {
  let component: TravelerReportsComponent;
  let fixture: ComponentFixture<TravelerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
