import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimLostdamagedExistingComponent } from './testsim-lostdamaged-existing.component';

describe('TestsimLostdamagedExistingComponent', () => {
  let component: TestsimLostdamagedExistingComponent;
  let fixture: ComponentFixture<TestsimLostdamagedExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostdamagedExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostdamagedExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
