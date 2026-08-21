import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimTransferComponent } from './testsim-transfer.component';

describe('TestsimTransferComponent', () => {
  let component: TestsimTransferComponent;
  let fixture: ComponentFixture<TestsimTransferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
