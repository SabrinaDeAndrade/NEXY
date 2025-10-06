import { Carrinho } from "./Carrinho";
import { Produto } from "./Produto";




export interface CarrinhoItem {
  id: number;
  quantidade: number;
  precoUnitario: number;
  produto: Produto;
  carrinho: Carrinho;
}