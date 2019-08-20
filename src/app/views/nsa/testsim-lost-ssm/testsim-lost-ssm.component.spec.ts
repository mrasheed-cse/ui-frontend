import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimLostSsmComponent } from './testsim-lost-ssm.component';

describe('TestsimLostSsmComponent', () => {
  let component: TestsimLostSsmComponent;
  let fixture: ComponentFixture<TestsimLostSsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostSsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostSsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
