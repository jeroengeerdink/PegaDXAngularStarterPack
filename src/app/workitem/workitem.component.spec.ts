import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkitemComponent } from './workitem.component';

describe('WorkitemComponent', () => {
  let component: WorkitemComponent;
  let fixture: ComponentFixture<WorkitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
