import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimCreditlimitextComponent } from './testsim-creditlimitext.component';

describe('TestsimCreditlimitextComponent', () => {
  let component: TestsimCreditlimitextComponent;
  let fixture: ComponentFixture<TestsimCreditlimitextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimCreditlimitextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimCreditlimitextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
