import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimTransferNewComponent } from './testsim-transfer-new.component';

describe('TestsimTransferNewComponent', () => {
  let component: TestsimTransferNewComponent;
  let fixture: ComponentFixture<TestsimTransferNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimTransferNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimTransferNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
