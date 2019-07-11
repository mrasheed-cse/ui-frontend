import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitiondetailsFormComponent } from './requisitiondetails-form.component';

describe('RequisitiondetailsFormComponent', () => {
  let component: RequisitiondetailsFormComponent;
  let fixture: ComponentFixture<RequisitiondetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitiondetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitiondetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
