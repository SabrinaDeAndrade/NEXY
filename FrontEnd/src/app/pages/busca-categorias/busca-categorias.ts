import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ListaCategorias } from '../../components/listas/lista-categorias/lista-categorias';
import { ListaProdutos } from '../../components/listas/lista-produtos/lista-produtos';

@Component({
  selector: 'app-busca-categorias',
  standalone: true,
  imports: [CommonModule, ListaCategorias, ListaProdutos],
  templateUrl: './busca-categorias.html',
  styleUrls: ['./busca-categorias.css']
})
export class BuscaCategorias{
 constructor() { }
}
