import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimDeactivationExistingComponent } from './testsim-deactivation-existing.component';

describe('TestsimDeactivationExistingComponent', () => {
  let component: TestsimDeactivationExistingComponent;
  let fixture: ComponentFixture<TestsimDeactivationExistingComponent>;

  beforeEach(async(() => {
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
