import { TestBed } from '@angular/core/testing';

import { Endereco } from './endereco';

describe('Endereco', () => {
  let service: Endereco;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Endereco);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
