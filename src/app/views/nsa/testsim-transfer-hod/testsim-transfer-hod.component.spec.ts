import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimTransferHodComponent } from './testsim-transfer-hod.component';

describe('TestsimTransferHodComponent', () => {
  let component: TestsimTransferHodComponent;
  let fixture: ComponentFixture<TestsimTransferHodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTransferHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTransferHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
