import { CarrinhoItem } from "./CarrinhoItem";
import { Cliente } from "./Cliente";

export interface Carrinho {
  id: number;
  itens: CarrinhoItem[];
  cliente: Cliente;
  valorTotal: number;
}