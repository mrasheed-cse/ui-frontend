import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListDamagedComponent } from './test-sim-action-list-damaged.component';

describe('TestSimActionListDamagedComponent', () => {
  let component: TestSimActionListDamagedComponent;
  let fixture: ComponentFixture<TestSimActionListDamagedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListDamagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListDamagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
