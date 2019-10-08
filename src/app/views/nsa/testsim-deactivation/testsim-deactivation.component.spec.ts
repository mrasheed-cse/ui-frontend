import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimDeactivationComponent } from './testsim-deactivation.component';

describe('TestsimDeactivationComponent', () => {
  let component: TestsimDeactivationComponent;
  let fixture: ComponentFixture<TestsimDeactivationComponent>;

  beforeEach(async(() => {
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
