import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimRequisitionhistoryreportComponent } from './testsim-requisitionhistoryreport.component';

describe('TestsimRequisitionhistoryreportComponent', () => {
  let component: TestsimRequisitionhistoryreportComponent;
  let fixture: ComponentFixture<TestsimRequisitionhistoryreportComponent>;

  beforeEach(async(() => {
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
