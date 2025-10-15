import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CarrinhoItem } from '../../interfaces/CarrinhoItem';
import { CarrinhoStateService } from '../../services/carrinho-state-service';

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

   constructor(private carrinhoStateService: CarrinhoStateService) {
    // Apontamos nosso observable de itens para o do serviço
    this.itens$ = this.carrinhoStateService.itens$;
    
    // Criamos um novo observable que calcula o total sempre que a lista de itens mudar
    this.valorTotal$ = this.itens$.pipe(
      map(itens => 
        itens.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0)
      )
    );
  }

  removerItem(itemId: number): void {
    if (confirm('Tem certeza que deseja remover este item do carrinho?')) {
      this.carrinhoStateService.removerItem(itemId);
    }
  }

  atualizarQuantidade(itemId: number, event: any): void {
    const novaQuantidade = Number((event.target as HTMLInputElement).value);
    this.carrinhoStateService.atualizarQuantidade(itemId, novaQuantidade);
  }

}
