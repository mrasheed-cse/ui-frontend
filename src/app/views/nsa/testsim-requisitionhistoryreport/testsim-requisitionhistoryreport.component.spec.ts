import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimRequisitionhistoryreportComponent } from './testsim-requisitionhistoryreport.component';

describe('TestsimRequisitionhistoryreportComponent', () => {
  let component: TestsimRequisitionhistoryreportComponent;
  let fixture: ComponentFixture<TestsimRequisitionhistoryreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimRequisitionhistoryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimRequisitionhistoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
