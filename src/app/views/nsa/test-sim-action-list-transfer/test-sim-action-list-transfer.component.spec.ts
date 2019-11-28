import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSimActionListTransferComponent } from './test-sim-action-list-transfer.component';

describe('TestSimActionListTransferComponent', () => {
  let component: TestSimActionListTransferComponent;
  let fixture: ComponentFixture<TestSimActionListTransferComponent>;

  beforeEach(async(() => {
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
