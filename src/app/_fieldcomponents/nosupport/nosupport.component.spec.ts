import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosupportComponent } from './nosupport.component';

describe('NosupportComponent', () => {
  let component: NosupportComponent;
  let fixture: ComponentFixture<NosupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
