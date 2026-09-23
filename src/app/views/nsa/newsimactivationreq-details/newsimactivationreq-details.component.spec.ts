import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsimactivationreqDetailsComponent } from './newsimactivationreq-details.component';

describe('NewsimactivationreqDetailsComponent', () => {
  let component: NewsimactivationreqDetailsComponent;
  let fixture: ComponentFixture<NewsimactivationreqDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsimactivationreqDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsimactivationreqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
