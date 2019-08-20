import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimLostHodComponent } from './testsim-lost-hod.component';

describe('TestsimLostHodComponent', () => {
  let component: TestsimLostHodComponent;
  let fixture: ComponentFixture<TestsimLostHodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
