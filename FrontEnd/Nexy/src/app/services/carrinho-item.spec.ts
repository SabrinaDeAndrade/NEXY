import { TestBed } from '@angular/core/testing';

import { CarrinhoItem } from './carrinho-item';

describe('CarrinhoItem', () => {
  let service: CarrinhoItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
