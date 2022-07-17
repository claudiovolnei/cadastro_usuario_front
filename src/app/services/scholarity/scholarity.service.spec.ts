/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScholarityService } from './scholarity.service';

describe('Service: Scholarity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScholarityService]
    });
  });

  it('should ...', inject([ScholarityService], (service: ScholarityService) => {
    expect(service).toBeTruthy();
  }));
});
