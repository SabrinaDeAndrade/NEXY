import { TestBed } from '@angular/core/testing';

import { ContaBancariaNexy } from './conta-bancaria-nexy';

describe('ContaBancariaNexy', () => {
  let service: ContaBancariaNexy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaBancariaNexy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
