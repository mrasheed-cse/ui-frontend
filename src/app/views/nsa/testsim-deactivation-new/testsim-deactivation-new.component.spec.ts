import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDeactivationNewComponent } from './testsim-deactivation-new.component';

describe('TestsimDeactivationNewComponent', () => {
  let component: TestsimDeactivationNewComponent;
  let fixture: ComponentFixture<TestsimDeactivationNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDeactivationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDeactivationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
