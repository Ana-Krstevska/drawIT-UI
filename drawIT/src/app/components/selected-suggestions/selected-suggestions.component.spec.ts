import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSuggestionsComponent } from './selected-suggestions.component';

describe('SelectedSuggestionsComponent', () => {
  let component: SelectedSuggestionsComponent;
  let fixture: ComponentFixture<SelectedSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
