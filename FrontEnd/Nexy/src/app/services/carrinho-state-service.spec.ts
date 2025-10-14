import { TestBed } from '@angular/core/testing';

import { CarrinhoStateService } from './carrinho-state-service';

describe('CarrinhoStateService', () => {
  let service: CarrinhoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
