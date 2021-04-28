import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopviewComponent } from './topview.component';

describe('TopviewComponent', () => {
  let component: TopviewComponent;
  let fixture: ComponentFixture<TopviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
