import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimMysimsComponent } from './testsim-mysims.component';

describe('TestsimMysimsComponent', () => {
  let component: TestsimMysimsComponent;
  let fixture: ComponentFixture<TestsimMysimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimMysimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimMysimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
