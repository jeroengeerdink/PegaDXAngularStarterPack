import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklistpanelComponent } from './worklistpanel.component';

describe('WorklistpanelComponent', () => {
  let component: WorklistpanelComponent;
  let fixture: ComponentFixture<WorklistpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklistpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklistpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
