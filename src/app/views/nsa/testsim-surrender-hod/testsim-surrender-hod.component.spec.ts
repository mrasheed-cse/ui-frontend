import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimSurrenderHodComponent } from './testsim-surrender-hod.component';

describe('TestsimSurrenderHodComponent', () => {
  let component: TestsimSurrenderHodComponent;
  let fixture: ComponentFixture<TestsimSurrenderHodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimSurrenderHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimSurrenderHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
