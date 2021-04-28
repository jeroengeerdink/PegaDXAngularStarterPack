import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppageComponent } from './toppage.component';

describe('ToppageComponent', () => {
  let component: ToppageComponent;
  let fixture: ComponentFixture<ToppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
