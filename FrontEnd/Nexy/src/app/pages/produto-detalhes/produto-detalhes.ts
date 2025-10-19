import { Component, OnInit } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produtoService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarrinhoStateService } from '../../services/carrinho-state-service';
import { ImagemProduto } from '../../interfaces/ImagemProduto';

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

  imagemSelecionadaUrl: string | null = null;

  mostrarModalConfirmacao = false;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoStateService: CarrinhoStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.buscarPorId(id).subscribe({
      next: (dados) => {
        this.produto = dados;
        if (this.produto.imagens && this.produto.imagens.length > 0) {
          this.imagemSelecionadaUrl = this.produto.imagens[0].url;
        }
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produto:', erro);
        this.carregando = false;
      }
    });
  }

  selecionarImagem(imagem: ImagemProduto): void {
    this.imagemSelecionadaUrl = imagem.url;
  }

  adicionarAoCarrinho(): void {
    if (!this.produto) return;
    this.carrinhoStateService.adicionarAoCarrinho(this.produto, this.quantidade);
    this.mostrarModalConfirmacao = true;
  }

  fecharModal(): void {
    this.mostrarModalConfirmacao = false;
  }

  irParaCarrinho(): void {
    this.fecharModal();
    this.router.navigate(['/carrinho']);
  }

  continuarComprando(): void {
    this.fecharModal();
    this.router.navigate(['/categorias']);
  }

}