import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategorias } from './lista-categorias';

describe('ListaCategorias', () => {
  let component: ListaCategorias;
  let fixture: ComponentFixture<ListaCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
