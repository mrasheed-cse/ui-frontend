import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimTransferSsmComponent } from './testsim-transfer-ssm.component';

describe('TestsimTransferSsmComponent', () => {
  let component: TestsimTransferSsmComponent;
  let fixture: ComponentFixture<TestsimTransferSsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTransferSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTransferSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
