import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSimActionListDeactivateComponent } from './test-sim-action-list-deactivate.component';

describe('TestSimActionListDeactivateComponent', () => {
  let component: TestSimActionListDeactivateComponent;
  let fixture: ComponentFixture<TestSimActionListDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
