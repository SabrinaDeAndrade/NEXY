import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPedidos } from './meus-pedidos';

describe('MeusPedidos', () => {
  let component: MeusPedidos;
  let fixture: ComponentFixture<MeusPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
