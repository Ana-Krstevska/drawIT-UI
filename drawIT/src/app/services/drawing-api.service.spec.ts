import { TestBed } from '@angular/core/testing';

import { DrawingAPIService } from './drawing-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DrawingAPIService', () => {
  let service: DrawingAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler ]
    });
    service = TestBed.inject(DrawingAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
