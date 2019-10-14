import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimDeactivationSsmComponent } from './testsim-deactivation-ssm.component';

describe('TestsimDeactivationSsmComponent', () => {
  let component: TestsimDeactivationSsmComponent;
  let fixture: ComponentFixture<TestsimDeactivationSsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDeactivationSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDeactivationSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
