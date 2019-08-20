import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimSurrenderComponent } from './testsim-surrender.component';

describe('TestsimSurrenderComponent', () => {
  let component: TestsimSurrenderComponent;
  let fixture: ComponentFixture<TestsimSurrenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimSurrenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimSurrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
