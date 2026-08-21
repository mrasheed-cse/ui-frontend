import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestsimdashboardComponent } from './testsimdashboard.component';

describe('TestsimdashboardComponent', () => {
  let component: TestsimdashboardComponent;
  let fixture: ComponentFixture<TestsimdashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsimdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsimdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
