import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../interfaces/Produto';
import { ProdutoService } from '../../services/produtoService';

@Component({
  selector: 'app-gerenciar-produtos',
 standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciar-produtos.html',
  styleUrl: './gerenciar-produtos.css'
})
export class GerenciarProdutos implements OnInit {

 public produtos: Produto[] = [];
  public carregando = true;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  public carregarProdutos(): void {
    this.carregando = true;
    this.produtoService.listarTodos().subscribe(dados => {
      this.produtos = dados;
      this.carregando = false;
    });
  }

public removerProduto(id: number): void {
    if (confirm('Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.')) {
      this.produtoService.deletar(id).subscribe({
        next: () => {
          alert('Produto removido com sucesso!');
          this.carregarProdutos(); 
        },
        error: (err) => {
          alert('Erro ao remover produto.');
          console.error(err);
        }
      });
    }
  }
}
