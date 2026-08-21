import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimLostComponent } from './testsim-lost.component';

describe('TestsimLostComponent', () => {
  let component: TestsimLostComponent;
  let fixture: ComponentFixture<TestsimLostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
