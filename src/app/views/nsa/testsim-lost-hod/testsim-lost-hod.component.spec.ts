import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimLostHodComponent } from './testsim-lost-hod.component';

describe('TestsimLostHodComponent', () => {
  let component: TestsimLostHodComponent;
  let fixture: ComponentFixture<TestsimLostHodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
