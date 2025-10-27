import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGerenciamento } from './lista-gerenciamento';

describe('ListaGerenciamento', () => {
  let component: ListaGerenciamento;
  let fixture: ComponentFixture<ListaGerenciamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGerenciamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGerenciamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
