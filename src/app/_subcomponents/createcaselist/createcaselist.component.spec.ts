import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecaselistComponent } from './createcaselist.component';

describe('CreatecaselistComponent', () => {
  let component: CreatecaselistComponent;
  let fixture: ComponentFixture<CreatecaselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecaselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
