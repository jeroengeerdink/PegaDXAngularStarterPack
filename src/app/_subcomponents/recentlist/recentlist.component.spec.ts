import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlistComponent } from './recentlist.component';

describe('RecentlistComponent', () => {
  let component: RecentlistComponent;
  let fixture: ComponentFixture<RecentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
