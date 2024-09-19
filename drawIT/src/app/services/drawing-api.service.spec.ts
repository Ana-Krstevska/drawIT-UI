import { TestBed } from '@angular/core/testing';

import { DrawingAPIService } from './drawing-api.service';

describe('DrawingAPIService', () => {
  let service: DrawingAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
