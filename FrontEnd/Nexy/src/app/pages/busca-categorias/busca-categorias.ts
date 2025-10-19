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
  standalone: true,
  imports: [CommonModule, ListaCategorias, ListaProdutos, RouterLink],
  templateUrl: './busca-categorias.html',
  styleUrls: ['./busca-categorias.css']
})
export class BuscaCategorias{
 constructor() { }
}
