import { Cliente } from "./Cliente";
import { Endereco } from "./Endereco";


export interface Pedido {
  id: number;
  status: string;
  valorTotal: number;
  dataPedido: Date;
  cliente: Cliente;
  endereco: Endereco;
}