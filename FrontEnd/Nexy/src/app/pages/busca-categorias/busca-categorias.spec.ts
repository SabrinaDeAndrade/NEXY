import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCategorias } from './busca-categorias';

describe('BuscaCategorias', () => {
  let component: BuscaCategorias;
  let fixture: ComponentFixture<BuscaCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
