import { Pedido } from "./Pedido";
import { Produto } from "./Produto";


export interface PedidoItem {
  id: number;
  quantidade: number;
  precoUnitario: number;
  pedido: Pedido;
  produto: Produto;
}