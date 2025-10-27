import { TestBed } from '@angular/core/testing';

import { ClienteCartao } from './cliente-cartaoService';

describe('ClienteCartao', () => {
  let service: ClienteCartao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteCartao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
