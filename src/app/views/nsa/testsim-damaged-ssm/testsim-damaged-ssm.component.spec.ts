import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimDamagedSsmComponent } from './testsim-damaged-ssm.component';

describe('TestsimDamagedSsmComponent', () => {
  let component: TestsimDamagedSsmComponent;
  let fixture: ComponentFixture<TestsimDamagedSsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDamagedSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDamagedSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
