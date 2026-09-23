import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimRechargeExistingComponent } from './testsim-recharge-existing.component';

describe('TestsimRechargeExistingComponent', () => {
  let component: TestsimRechargeExistingComponent;
  let fixture: ComponentFixture<TestsimRechargeExistingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRechargeExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRechargeExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
