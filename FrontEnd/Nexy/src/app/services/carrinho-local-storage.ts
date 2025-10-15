import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../interfaces/CarrinhoItem';
import { Produto } from '../interfaces/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoLocalStorageService {
   private storageKey = 'carrinho_anonimo';

  constructor() { }

  private salvar(itens: CarrinhoItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
  }

  public getItens(): CarrinhoItem[] {
    const itensSalvos = localStorage.getItem(this.storageKey);
    return itensSalvos ? JSON.parse(itensSalvos) : [];
  }

  public adicionarItem(produto: Produto, quantidade: number): void {
    const itens = this.getItens();
    const itemExistente = itens.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      const novoItem: CarrinhoItem = {
        id: new Date().getTime(), // ID temporário para o item local
        produto: produto,
        quantidade: quantidade,
        precoUnitario: produto.preco,
        carrinho: null!
      };
      itens.push(novoItem);
    }
    this.salvar(itens);
  }

  public removerItem(itemId: number): void {
    let itens = this.getItens();
    itens = itens.filter(item => item.id !== itemId);
    this.salvar(itens);
  }

  public atualizarQuantidade(itemId: number, quantidade: number): void {
    const itens = this.getItens();
    const itemParaAtualizar = itens.find(item => item.id === itemId);

    if (itemParaAtualizar) {
      itemParaAtualizar.quantidade = quantidade;
      this.salvar(itens);
    }
  }

  public limparCarrinho(): void {
    localStorage.removeItem(this.storageKey);
  }
}
