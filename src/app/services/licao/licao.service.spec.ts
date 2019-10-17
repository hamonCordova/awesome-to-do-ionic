import { TestBed } from '@angular/core/testing';

import { LicaoService } from './licao.service';

describe('LicaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicaoService = TestBed.get(LicaoService);
    expect(service).toBeTruthy();
  });
});
