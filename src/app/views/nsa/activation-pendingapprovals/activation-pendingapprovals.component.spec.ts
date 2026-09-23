import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivationPendingapprovalsComponent } from './activation-pendingapprovals.component';

describe('ActivationPendingapprovalsComponent', () => {
  let component: ActivationPendingapprovalsComponent;
  let fixture: ComponentFixture<ActivationPendingapprovalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationPendingapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationPendingapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
