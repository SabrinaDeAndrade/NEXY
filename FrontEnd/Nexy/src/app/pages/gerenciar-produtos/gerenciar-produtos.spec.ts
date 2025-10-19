import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarProdutos } from './gerenciar-produtos';

describe('GerenciarProdutos', () => {
  let component: GerenciarProdutos;
  let fixture: ComponentFixture<GerenciarProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
