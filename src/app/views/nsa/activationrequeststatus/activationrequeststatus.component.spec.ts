import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationrequeststatusComponent } from './activationrequeststatus.component';

describe('ActivationrequeststatusComponent', () => {
  let component: ActivationrequeststatusComponent;
  let fixture: ComponentFixture<ActivationrequeststatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationrequeststatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationrequeststatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
