import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListLimitExtComponent } from './test-sim-action-list-limit-ext.component';

describe('TestSimActionListLimitExtComponent', () => {
  let component: TestSimActionListLimitExtComponent;
  let fixture: ComponentFixture<TestSimActionListLimitExtComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListLimitExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListLimitExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
