import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimTimeextHodComponent } from './testsim-timeext-hod.component';

describe('TestsimTimeextHodComponent', () => {
  let component: TestsimTimeextHodComponent;
  let fixture: ComponentFixture<TestsimTimeextHodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTimeextHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTimeextHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
