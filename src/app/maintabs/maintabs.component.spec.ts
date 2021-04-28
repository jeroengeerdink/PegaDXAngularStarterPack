import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintabsComponent } from './maintabs.component';

describe('MaintabsComponent', () => {
  let component: MaintabsComponent;
  let fixture: ComponentFixture<MaintabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
