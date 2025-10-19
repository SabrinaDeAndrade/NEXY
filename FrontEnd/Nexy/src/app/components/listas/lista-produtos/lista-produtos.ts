import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Cards } from '../../cards-produto/cards';
import { Produto } from '../../../interfaces/Produto';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../services/produtoService';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, Cards, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css'
})
export class ListaProdutos implements OnInit {

  produtos: Produto[] = [];
  carregando = true;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.escutarMudancasDeRota();
  }

   private escutarMudancasDeRota(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.carregando = true;
        const categoriaId = params.get('id');

        if (categoriaId) {
          return this.produtoService.getProductsByCategoryId(+categoriaId); 
        } else {
          return this.produtoService.listarTodos();
        }
      })
    ).subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error("Erro ao carregar produtos pela rota", err);
        this.carregando = false;
        this.produtos = [];
      }
    });
  }
}