import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimCreditlimitextSsmComponent } from './testsim-creditlimitext-ssm.component';

describe('TestsimCreditlimitextSsmComponent', () => {
  let component: TestsimCreditlimitextSsmComponent;
  let fixture: ComponentFixture<TestsimCreditlimitextSsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimCreditlimitextSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimCreditlimitextSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
