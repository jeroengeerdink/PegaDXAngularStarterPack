import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatinglayoutComponent } from './repeatinglayout.component';

describe('RepeatinglayoutComponent', () => {
  let component: RepeatinglayoutComponent;
  let fixture: ComponentFixture<RepeatinglayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatinglayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatinglayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
