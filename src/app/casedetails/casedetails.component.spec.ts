import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasedetailsComponent } from './casedetails.component';

describe('CasedetailsComponent', () => {
  let component: CasedetailsComponent;
  let fixture: ComponentFixture<CasedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
