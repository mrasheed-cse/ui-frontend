import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimRechargeHodComponent } from './testsim-recharge-hod.component';

describe('TestsimRechargeHodComponent', () => {
  let component: TestsimRechargeHodComponent;
  let fixture: ComponentFixture<TestsimRechargeHodComponent>;

  beforeEach(async(() => {
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
