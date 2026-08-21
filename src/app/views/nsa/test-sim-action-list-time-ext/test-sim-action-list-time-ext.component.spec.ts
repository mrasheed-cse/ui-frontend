import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListTimeExtComponent } from './test-sim-action-list-time-ext.component';

describe('TestSimActionListTimeExtComponent', () => {
  let component: TestSimActionListTimeExtComponent;
  let fixture: ComponentFixture<TestSimActionListTimeExtComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListTimeExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListTimeExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
