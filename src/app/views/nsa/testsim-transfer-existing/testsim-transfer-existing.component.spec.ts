import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimTransferExistingComponent } from './testsim-transfer-existing.component';

describe('TestsimTransferExistingComponent', () => {
  let component: TestsimTransferExistingComponent;
  let fixture: ComponentFixture<TestsimTransferExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTransferExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTransferExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
