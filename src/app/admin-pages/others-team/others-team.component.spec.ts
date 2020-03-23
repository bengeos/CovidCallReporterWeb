import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersTeamComponent } from './others-team.component';

describe('OthersTeamComponent', () => {
  let component: OthersTeamComponent;
  let fixture: ComponentFixture<OthersTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
