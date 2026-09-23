import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDeactivationExistingComponent } from './testsim-deactivation-existing.component';

describe('TestsimDeactivationExistingComponent', () => {
  let component: TestsimDeactivationExistingComponent;
  let fixture: ComponentFixture<TestsimDeactivationExistingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDeactivationExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDeactivationExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
