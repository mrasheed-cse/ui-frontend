import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostdamagedetailsdeliveryComponent } from './lostdamagedetailsdelivery.component';

describe('LostdamagedetailsdeliveryComponent', () => {
  let component: LostdamagedetailsdeliveryComponent;
  let fixture: ComponentFixture<LostdamagedetailsdeliveryComponent>;

  beforeEach(async(() => {
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
