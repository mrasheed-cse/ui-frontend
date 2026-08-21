import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimSurrenderNewComponent } from './testsim-surrender-new.component';

describe('TestsimSurrenderNewComponent', () => {
  let component: TestsimSurrenderNewComponent;
  let fixture: ComponentFixture<TestsimSurrenderNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimSurrenderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimSurrenderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
