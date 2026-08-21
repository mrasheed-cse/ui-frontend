import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDeactivationComponent } from './testsim-deactivation.component';

describe('TestsimDeactivationComponent', () => {
  let component: TestsimDeactivationComponent;
  let fixture: ComponentFixture<TestsimDeactivationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDeactivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDeactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
