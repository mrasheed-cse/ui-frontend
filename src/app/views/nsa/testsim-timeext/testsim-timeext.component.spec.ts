import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimTimeextComponent } from './testsim-timeext.component';

describe('TestsimTimeextComponent', () => {
  let component: TestsimTimeextComponent;
  let fixture: ComponentFixture<TestsimTimeextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTimeextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTimeextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
