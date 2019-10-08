import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationPendingregistrationsComponent } from './activation-pendingregistrations.component';

describe('ActivationPendingregistrationsComponent', () => {
  let component: ActivationPendingregistrationsComponent;
  let fixture: ComponentFixture<ActivationPendingregistrationsComponent>;

  beforeEach(async(() => {
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
