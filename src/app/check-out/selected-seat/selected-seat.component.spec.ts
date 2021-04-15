import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSeatComponent } from './selected-seat.component';

describe('SelectedSeatComponent', () => {
  let component: SelectedSeatComponent;
  let fixture: ComponentFixture<SelectedSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
