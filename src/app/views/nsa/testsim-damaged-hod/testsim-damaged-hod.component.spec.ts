import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimDamagedHodComponent } from './testsim-damaged-hod.component';

describe('TestsimDamagedHodComponent', () => {
  let component: TestsimDamagedHodComponent;
  let fixture: ComponentFixture<TestsimDamagedHodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimDamagedHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimDamagedHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
