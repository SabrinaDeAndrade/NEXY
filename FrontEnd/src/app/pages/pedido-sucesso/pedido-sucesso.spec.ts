import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoSucesso } from './pedido-sucesso';

describe('PedidoSucesso', () => {
  let component: PedidoSucesso;
  let fixture: ComponentFixture<PedidoSucesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoSucesso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoSucesso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
