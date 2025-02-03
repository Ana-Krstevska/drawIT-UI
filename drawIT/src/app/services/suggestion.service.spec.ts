import { TestBed } from '@angular/core/testing';

import { SuggestionsService } from './suggestion.service';

describe('SuggestionService', () => {
  let service: SuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
