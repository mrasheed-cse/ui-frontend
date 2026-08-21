import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenerateanalyzeComponent } from './generateanalyze.component';

describe('GenerateanalyzeComponent', () => {
  let component: GenerateanalyzeComponent;
  let fixture: ComponentFixture<GenerateanalyzeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateanalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateanalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
