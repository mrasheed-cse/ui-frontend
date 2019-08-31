import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsimLostdamagedNewComponent } from './testsim-lostdamaged-new.component';

describe('TestsimLostdamagedNewComponent', () => {
  let component: TestsimLostdamagedNewComponent;
  let fixture: ComponentFixture<TestsimLostdamagedNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimLostdamagedNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimLostdamagedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
