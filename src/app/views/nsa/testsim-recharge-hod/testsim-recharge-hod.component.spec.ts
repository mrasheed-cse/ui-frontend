import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimRechargeHodComponent } from './testsim-recharge-hod.component';

describe('TestsimRechargeHodComponent', () => {
  let component: TestsimRechargeHodComponent;
  let fixture: ComponentFixture<TestsimRechargeHodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRechargeHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRechargeHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
