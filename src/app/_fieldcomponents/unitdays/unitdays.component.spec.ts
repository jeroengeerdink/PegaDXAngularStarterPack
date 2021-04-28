import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitdaysComponent } from './unitdays.component';

describe('UnitdaysComponent', () => {
  let component: UnitdaysComponent;
  let fixture: ComponentFixture<UnitdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
