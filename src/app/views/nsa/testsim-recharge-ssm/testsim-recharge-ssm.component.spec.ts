import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimRechargeSsmComponent } from './testsim-recharge-ssm.component';

describe('TestsimRechargeSsmComponent', () => {
  let component: TestsimRechargeSsmComponent;
  let fixture: ComponentFixture<TestsimRechargeSsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRechargeSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRechargeSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
