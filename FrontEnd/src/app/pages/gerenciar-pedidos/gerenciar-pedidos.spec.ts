import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPedidos } from './gerenciar-pedidos';

describe('GerenciarPedidos', () => {
  let component: GerenciarPedidos;
  let fixture: ComponentFixture<GerenciarPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
