import { TestBed } from '@angular/core/testing';

import { Endereco } from './enderecoService';

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
