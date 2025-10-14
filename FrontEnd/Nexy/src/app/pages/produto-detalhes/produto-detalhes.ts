import { Component, OnInit } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produtoService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarrinhoStateService } from '../../services/carrinho-state-service';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './produto-detalhes.html',
  styleUrl: './produto-detalhes.css'
})
export class ProdutoDetalhes implements OnInit {

  produto!: Produto;
  quantidade: number = 1;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoStateService: CarrinhoStateService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.produto = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produto:', erro);
        this.carregando = false;
      }
    });
  }

  

adicionarAoCarrinho(): void {
  this.carrinhoStateService.adicionarAoCarrinho(this.produto, this.quantidade);
}

 
}