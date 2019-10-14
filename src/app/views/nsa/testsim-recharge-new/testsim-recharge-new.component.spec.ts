import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimRechargeNewComponent } from './testsim-recharge-new.component';

describe('TestsimRechargeNewComponent', () => {
  let component: TestsimRechargeNewComponent;
  let fixture: ComponentFixture<TestsimRechargeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRechargeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRechargeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
