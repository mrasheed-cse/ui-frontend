import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimSurrenderSsmComponent } from './testsim-surrender-ssm.component';

describe('TestsimSurrenderSsmComponent', () => {
  let component: TestsimSurrenderSsmComponent;
  let fixture: ComponentFixture<TestsimSurrenderSsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimSurrenderSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimSurrenderSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
