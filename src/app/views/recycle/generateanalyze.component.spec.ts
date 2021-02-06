import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateanalyzeComponent } from './generateanalyze.component';

describe('GenerateanalyzeComponent', () => {
  let component: GenerateanalyzeComponent;
  let fixture: ComponentFixture<GenerateanalyzeComponent>;

  beforeEach(async(() => {
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
