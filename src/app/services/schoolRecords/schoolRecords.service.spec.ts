/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SchoolRecordsService } from './schoolRecords.service';

describe('Service: SchoolRecords', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolRecordsService]
    });
  });

  it('should ...', inject([SchoolRecordsService], (service: SchoolRecordsService) => {
    expect(service).toBeTruthy();
  }));
});
