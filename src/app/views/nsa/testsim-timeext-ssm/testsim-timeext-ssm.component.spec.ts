import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimTimeextSsmComponent } from './testsim-timeext-ssm.component';

describe('TestsimTimeextSsmComponent', () => {
  let component: TestsimTimeextSsmComponent;
  let fixture: ComponentFixture<TestsimTimeextSsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTimeextSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTimeextSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
