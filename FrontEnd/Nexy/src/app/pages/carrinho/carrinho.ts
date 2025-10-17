import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CarrinhoItem } from '../../interfaces/CarrinhoItem';
import { CarrinhoStateService } from '../../services/carrinho-state-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho {

  itens$: Observable<CarrinhoItem[]>;
  valorTotal$: Observable<number>;

  constructor(
    private carrinhoStateService: CarrinhoStateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itens$ = this.carrinhoStateService.itens$;

    this.valorTotal$ = this.itens$.pipe(
      map(itens =>
        itens.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0)
      )
    );}


    removerItem(itemId: number): void {
      if(confirm('Tem certeza que deseja remover este item do carrinho?')) {
      this.carrinhoStateService.removerItem(itemId);
    }
  }

  atualizarQuantidade(itemId: number, event: any): void {
    const novaQuantidade = Number((event.target as HTMLInputElement).value);
    this.carrinhoStateService.atualizarQuantidade(itemId, novaQuantidade);
  }

   irParaCheckout(): void {
    // Verifica se o usuário está logado usando o serviço de autenticação
    if (this.authService.isLoggedIn()) {
      // Se estiver logado, navega para a página de checkout
      this.router.navigate(['/checkout']);
    } else {
      // Se não estiver logado, exibe um alerta e navega para a página de login
      alert('Você precisa fazer login para finalizar a compra.');
      this.router.navigate(['/login']);
    }
  }

}
