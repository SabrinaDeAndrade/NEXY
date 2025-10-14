import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../../interfaces/Categorias';




@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-categorias.html',
  styleUrl: './lista-categorias.css'
})
export class ListaCategorias {
  @Input() categorias: Categoria[] = [];
  @Input() CategoriaPorId: number | null = null;

  // @Output() avisa o componente pai sobre um evento
  @Output() categorySelected = new EventEmitter<number>();

  selectCategory(categoryId: number) {

    this.categorySelected.emit(categoryId);
  }
}