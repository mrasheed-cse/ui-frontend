import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimTimeextCreditlimitextComponent } from './testsim-timeext-creditlimitext.component';

describe('TestsimTimeextCreditlimitextComponent', () => {
  let component: TestsimTimeextCreditlimitextComponent;
  let fixture: ComponentFixture<TestsimTimeextCreditlimitextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTimeextCreditlimitextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTimeextCreditlimitextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
