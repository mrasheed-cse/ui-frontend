import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimSurrenderExistingComponent } from './testsim-surrender-existing.component';

describe('TestsimSurrenderExistingComponent', () => {
  let component: TestsimSurrenderExistingComponent;
  let fixture: ComponentFixture<TestsimSurrenderExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimSurrenderExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimSurrenderExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
