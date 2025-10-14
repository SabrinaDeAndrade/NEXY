import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ListaCategorias } from '../../components/listas/lista-categorias/lista-categorias';
import { ListaProdutos } from '../../components/listas/lista-produtos/lista-produtos';
import { RouterLink } from '@angular/router';

import { Produto } from '../../interfaces/Produto';

import { ProdutoService } from '../../services/produtoService';
import { CategoriaService } from '../../services/categoriaService';
import { Categoria } from '../../interfaces/Categorias';

@Component({
  selector: 'app-busca-categorias',
  imports: [CommonModule, ListaCategorias, ListaProdutos, RouterLink],
  templateUrl: './busca-categorias.html',
  styleUrls: ['./busca-categorias.css']
})
export class BuscaCategorias implements OnInit {

  todasCategorias: Categoria[] = [];
  produtosParaExibir: Produto[] = [];
  categoriaSelecionadaId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarTodas()
      .subscribe((categoriasDaApi: Categoria[]) => {
        this.todasCategorias = categoriasDaApi;
      });
  }

  onCategorySelected(categoryId: number): void {
    this.categoriaSelecionadaId = categoryId;
    this.produtoService.getProductsByCategoryId(categoryId).subscribe(produtos => {
      this.produtosParaExibir = produtos;
    });
  }
}
