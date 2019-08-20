import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimCreditlimitextHodComponent } from './testsim-creditlimitext-hod.component';

describe('TestsimCreditlimitextHodComponent', () => {
  let component: TestsimCreditlimitextHodComponent;
  let fixture: ComponentFixture<TestsimCreditlimitextHodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimCreditlimitextHodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimCreditlimitextHodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
