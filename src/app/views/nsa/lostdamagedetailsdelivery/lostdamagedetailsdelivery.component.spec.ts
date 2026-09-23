import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LostdamagedetailsdeliveryComponent } from './lostdamagedetailsdelivery.component';

describe('LostdamagedetailsdeliveryComponent', () => {
  let component: LostdamagedetailsdeliveryComponent;
  let fixture: ComponentFixture<LostdamagedetailsdeliveryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostdamagedetailsdeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostdamagedetailsdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
