import { TestBed } from '@angular/core/testing';

import { ConsoleOutputService } from './console-output.service';

describe('ConsoleOutputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsoleOutputService = TestBed.get(ConsoleOutputService);
    expect(service).toBeTruthy();
  });
});
