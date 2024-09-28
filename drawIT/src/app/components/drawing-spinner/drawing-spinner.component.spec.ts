import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSpinnerComponent } from './drawing-spinner.component';

describe('DrawingSpinnerComponent', () => {
  let component: DrawingSpinnerComponent;
  let fixture: ComponentFixture<DrawingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
