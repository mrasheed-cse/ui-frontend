import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimCreditLimitextExistingComponent } from './testsim-credit-limitext-existing.component';

describe('TestsimCreditLimitextExistingComponent', () => {
  let component: TestsimCreditLimitextExistingComponent;
  let fixture: ComponentFixture<TestsimCreditLimitextExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimCreditLimitextExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimCreditLimitextExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
