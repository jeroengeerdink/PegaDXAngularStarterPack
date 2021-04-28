
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklistComponent } from './worklist.component';

describe('WorklistComponent', () => {
  let component: WorklistComponent;
  let fixture: ComponentFixture<WorklistComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
