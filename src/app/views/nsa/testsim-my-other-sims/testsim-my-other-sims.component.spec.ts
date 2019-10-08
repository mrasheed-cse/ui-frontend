import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimMyOtherSimsComponent } from './testsim-my-other-sims.component';

describe('TestsimMyOtherSimsComponent', () => {
  let component: TestsimMyOtherSimsComponent;
  let fixture: ComponentFixture<TestsimMyOtherSimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimMyOtherSimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimMyOtherSimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
