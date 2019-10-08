import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimRechargeComponent } from './testsim-recharge.component';

describe('TestsimRechargeComponent', () => {
  let component: TestsimRechargeComponent;
  let fixture: ComponentFixture<TestsimRechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
