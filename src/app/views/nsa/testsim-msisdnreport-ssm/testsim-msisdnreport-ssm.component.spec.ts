import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimMsisdnreportSsmComponent } from './testsim-msisdnreport-ssm.component';

describe('TestsimMsisdnreportSsmComponent', () => {
  let component: TestsimMsisdnreportSsmComponent;
  let fixture: ComponentFixture<TestsimMsisdnreportSsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimMsisdnreportSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimMsisdnreportSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
