import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimSurrenderComponent } from './testsim-surrender.component';

describe('TestsimSurrenderComponent', () => {
  let component: TestsimSurrenderComponent;
  let fixture: ComponentFixture<TestsimSurrenderComponent>;

  beforeEach(waitForAsync(() => {
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
