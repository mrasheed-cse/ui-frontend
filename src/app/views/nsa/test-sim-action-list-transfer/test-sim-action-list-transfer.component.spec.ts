import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListTransferComponent } from './test-sim-action-list-transfer.component';

describe('TestSimActionListTransferComponent', () => {
  let component: TestSimActionListTransferComponent;
  let fixture: ComponentFixture<TestSimActionListTransferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
