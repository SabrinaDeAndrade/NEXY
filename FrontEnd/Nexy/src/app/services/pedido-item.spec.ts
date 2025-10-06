import { TestBed } from '@angular/core/testing';

import { PedidoItem } from './pedido-item';

describe('PedidoItem', () => {
  let service: PedidoItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
