import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../../../interfaces/Categorias';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriaService } from '../../../services/categoriaService';


@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './lista-categorias.html',
  styleUrl: './lista-categorias.css'
})
export class ListaCategorias  implements OnInit{
  
  
  categorias: Categoria[] = [];

  // Injete o CategoriaService
  constructor(
  private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarTodas().subscribe(dados => {
      this.categorias = dados;
    });
  }
}
