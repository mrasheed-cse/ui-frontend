import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequisitioneditComponent } from './requisitionedit.component';

describe('RequisitioneditComponent', () => {
  let component: RequisitioneditComponent;
  let fixture: ComponentFixture<RequisitioneditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
