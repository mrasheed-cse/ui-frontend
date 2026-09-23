import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivationPendingregistrationsComponent } from './activation-pendingregistrations.component';

describe('ActivationPendingregistrationsComponent', () => {
  let component: ActivationPendingregistrationsComponent;
  let fixture: ComponentFixture<ActivationPendingregistrationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationPendingregistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationPendingregistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
