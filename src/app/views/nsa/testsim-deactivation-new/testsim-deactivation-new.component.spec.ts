import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimDeactivationNewComponent } from './testsim-deactivation-new.component';

describe('TestsimDeactivationNewComponent', () => {
  let component: TestsimDeactivationNewComponent;
  let fixture: ComponentFixture<TestsimDeactivationNewComponent>;

  beforeEach(async(() => {
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
