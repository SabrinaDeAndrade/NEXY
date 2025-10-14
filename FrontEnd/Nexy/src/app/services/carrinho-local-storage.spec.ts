import { TestBed } from '@angular/core/testing';

import { CarrinhoLocalStorageService } from './carrinho-local-storage';

describe('CarrinhoLocalStorage', () => {
  let service: CarrinhoLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
