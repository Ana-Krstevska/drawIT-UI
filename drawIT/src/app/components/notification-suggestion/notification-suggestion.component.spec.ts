import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSuggestionComponent } from './notification-suggestion.component';

describe('NotificationSuggestionComponent', () => {
  let component: NotificationSuggestionComponent;
  let fixture: ComponentFixture<NotificationSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
