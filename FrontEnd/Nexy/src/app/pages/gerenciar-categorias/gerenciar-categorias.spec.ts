import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarCategorias } from './gerenciar-categorias';

describe('GerenciarCategorias', () => {
  let component: GerenciarCategorias;
  let fixture: ComponentFixture<GerenciarCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
