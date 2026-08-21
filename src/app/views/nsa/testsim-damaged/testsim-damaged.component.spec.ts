import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDamagedComponent } from './testsim-damaged.component';

describe('TestsimDamagedComponent', () => {
  let component: TestsimDamagedComponent;
  let fixture: ComponentFixture<TestsimDamagedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDamagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDamagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
