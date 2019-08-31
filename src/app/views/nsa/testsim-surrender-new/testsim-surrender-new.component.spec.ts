import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimSurrenderNewComponent } from './testsim-surrender-new.component';

describe('TestsimSurrenderNewComponent', () => {
  let component: TestsimSurrenderNewComponent;
  let fixture: ComponentFixture<TestsimSurrenderNewComponent>;

  beforeEach(async(() => {
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
