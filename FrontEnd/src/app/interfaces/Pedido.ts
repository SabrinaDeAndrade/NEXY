import { Cliente } from "./Cliente";
import { Endereco } from "./Endereco";
import { PedidoItem } from "./PedidoItem";


export interface Pedido {
  id: number;
  status: string;
  valorTotal: number;
  dataPedido: Date;
  cliente: Cliente;
  endereco: Endereco;
  itens: PedidoItem[];
}