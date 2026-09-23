import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListRechargeComponent } from './test-sim-action-list-recharge.component';

describe('TestSimActionListRechargeComponent', () => {
  let component: TestSimActionListRechargeComponent;
  let fixture: ComponentFixture<TestSimActionListRechargeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListRechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
