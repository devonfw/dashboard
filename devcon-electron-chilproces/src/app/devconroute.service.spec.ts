import { TestBed, inject } from '@angular/core/testing';

import { DevconrouteService } from './devconroute.service';

describe('DevconrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevconrouteService]
    });
  });

  it('should be created', inject([DevconrouteService], (service: DevconrouteService) => {
    expect(service).toBeTruthy();
  }));
});
