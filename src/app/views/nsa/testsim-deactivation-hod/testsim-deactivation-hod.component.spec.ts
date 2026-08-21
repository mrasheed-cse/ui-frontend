import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDeactivationHodComponent } from './testsim-deactivation-hod.component';

describe('TestsimDeactivationHodComponent', () => {
  let component: TestsimDeactivationHodComponent;
  let fixture: ComponentFixture<TestsimDeactivationHodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDeactivationHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDeactivationHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
