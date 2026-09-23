import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListLostComponent } from './test-sim-action-list-lost.component';

describe('TestSimActionListLostComponent', () => {
  let component: TestSimActionListLostComponent;
  let fixture: ComponentFixture<TestSimActionListLostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
