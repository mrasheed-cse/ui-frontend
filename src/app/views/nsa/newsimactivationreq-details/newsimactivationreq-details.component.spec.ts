import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsimactivationreqDetailsComponent } from './newsimactivationreq-details.component';

describe('NewsimactivationreqDetailsComponent', () => {
  let component: NewsimactivationreqDetailsComponent;
  let fixture: ComponentFixture<NewsimactivationreqDetailsComponent>;

  beforeEach(async(() => {
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
