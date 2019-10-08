import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsimactivationreqComponent } from './newsimactivationreq.component';

describe('NewsimactivationreqComponent', () => {
  let component: NewsimactivationreqComponent;
  let fixture: ComponentFixture<NewsimactivationreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsimactivationreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsimactivationreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
