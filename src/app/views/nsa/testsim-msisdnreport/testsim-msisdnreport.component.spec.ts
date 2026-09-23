import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimMsisdnreportComponent } from './testsim-msisdnreport.component';

describe('TestsimMsisdnreportComponent', () => {
  let component: TestsimMsisdnreportComponent;
  let fixture: ComponentFixture<TestsimMsisdnreportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimMsisdnreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimMsisdnreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
