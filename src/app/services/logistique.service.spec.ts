import { TestBed } from '@angular/core/testing';

import { LogistiqueService } from './logistique.service';

describe('LogistiqueService', () => {
  let service: LogistiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogistiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
