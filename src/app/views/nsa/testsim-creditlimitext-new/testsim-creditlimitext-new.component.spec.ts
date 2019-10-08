import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimCreditlimitextNewComponent } from './testsim-creditlimitext-new.component';

describe('TestsimCreditlimitextNewComponent', () => {
  let component: TestsimCreditlimitextNewComponent;
  let fixture: ComponentFixture<TestsimCreditlimitextNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimCreditlimitextNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimCreditlimitextNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
