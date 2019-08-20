import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimSurrenderHodComponent } from './testsim-surrender-hod.component';

describe('TestsimSurrenderHodComponent', () => {
  let component: TestsimSurrenderHodComponent;
  let fixture: ComponentFixture<TestsimSurrenderHodComponent>;

  beforeEach(async(() => {
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
