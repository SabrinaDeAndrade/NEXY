import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../../../interfaces/Categorias';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriaService } from '../../../services/categoriaService';
import { AuthService } from '../../../services/auth-service';




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
  public authService: AuthService) { }

  ngOnInit(): void {
    // Carregue suas categorias aqui
    this.categoriaService.listarTodas().subscribe(dados => {
      this.categorias = dados;
    });
  }
}
