import { TestBed } from '@angular/core/testing';

import { Pedido } from './pedidoService';

describe('Pedido', () => {
  let service: Pedido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pedido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
