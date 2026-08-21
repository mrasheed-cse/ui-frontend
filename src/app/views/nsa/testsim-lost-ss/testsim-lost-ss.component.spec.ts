import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimLostSsComponent } from './testsim-lost-ss.component';

describe('TestsimLostSsComponent', () => {
  let component: TestsimLostSsComponent;
  let fixture: ComponentFixture<TestsimLostSsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostSsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostSsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
