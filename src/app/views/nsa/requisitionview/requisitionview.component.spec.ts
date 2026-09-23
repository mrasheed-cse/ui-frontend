import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequisitionviewComponent } from './requisitionview.component';

describe('RequisitionviewComponent', () => {
  let component: RequisitionviewComponent;
  let fixture: ComponentFixture<RequisitionviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
