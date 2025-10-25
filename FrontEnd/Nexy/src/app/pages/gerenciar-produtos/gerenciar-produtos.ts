import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { ProdutoService } from '../../services/produtoService';

@Component({
  selector: 'app-gerenciar-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-produtos.html',
  styleUrl: './gerenciar-produtos.css'
})
export class GerenciarProdutos implements OnInit {

  public produtos: Produto[] = [];
  public carregando = true;

 @Output() requestProdutoForm = new EventEmitter<{ view: string, id?: number }>();


  constructor(private produtoService: ProdutoService) { }

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

  goToProdutoForm(productId?: number): void {
    console.log('GerenciarProdutos: Emitindo requestProdutoForm com ID:', productId);
    this.requestProdutoForm.emit({ view: 'produtoForm', id: productId });
  }
}
