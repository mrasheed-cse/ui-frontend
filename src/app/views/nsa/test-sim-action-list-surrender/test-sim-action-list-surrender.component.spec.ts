import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestSimActionListSurrenderComponent } from './test-sim-action-list-surrender.component';

describe('TestSimActionListSurrenderComponent', () => {
  let component: TestSimActionListSurrenderComponent;
  let fixture: ComponentFixture<TestSimActionListSurrenderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSimActionListSurrenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSimActionListSurrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
