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
  cartItems: CarrinhoItem[] = [];

  constructor(
    private carrinhoStateService: CarrinhoStateService,
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ sincroniza automaticamente com o serviço
    this.carrinhoStateService.itens$.subscribe(items => {
      this.cartItems = items;
    });
  }

  /** ✅ Subtotal */
  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.precoUnitario * item.quantidade,
      0
    );
  }

  /** ✅ Frete */
  get shipping(): number {
    return this.subtotal > 500 ? 0 : 29.99;
  }

  /** ✅ Total */
  get total(): number {
    return this.subtotal + this.shipping;
  }

  /** ✅ Remover item */
  removeItem(item: CarrinhoItem): void {
    if (confirm('Tem certeza que deseja remover este item do carrinho?')) {
      this.carrinhoStateService.removerItem(item.id);
    }
  }

  /** ✅ Botões + e - */
  updateQuantity(item: CarrinhoItem, change: number): void {
    const novaQuantidade = Math.max(1, item.quantidade + change);
    this.carrinhoStateService.atualizarQuantidade(item.id, novaQuantidade);
  }

  /** ✅ Ir para checkout */
  irParaCheckout(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      alert('Você precisa fazer login para finalizar a compra.');
      this.router.navigate(['/login']);
    }
  }
}
