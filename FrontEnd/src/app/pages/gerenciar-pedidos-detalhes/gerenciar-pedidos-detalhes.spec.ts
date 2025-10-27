import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPedidosDetalhes } from './gerenciar-pedidos-detalhes';

describe('GerenciarPedidosDetalhes', () => {
  let component: GerenciarPedidosDetalhes;
  let fixture: ComponentFixture<GerenciarPedidosDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarPedidosDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarPedidosDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
