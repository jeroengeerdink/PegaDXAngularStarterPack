import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatinggridComponent } from './repeatinggrid.component';

describe('RepeatinggridComponent', () => {
  let component: RepeatinggridComponent;
  let fixture: ComponentFixture<RepeatinggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatinggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatinggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
