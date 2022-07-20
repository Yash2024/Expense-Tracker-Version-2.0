import { TestBed } from '@angular/core/testing';

import { ExpServiceService } from './exp-service.service';

describe('ExpServiceService', () => {
  let service: ExpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
