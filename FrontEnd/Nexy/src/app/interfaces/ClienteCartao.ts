import { Cliente } from "./Cliente";

export interface ClienteCartao {
  id: number;
  nomeCompleto: string;
  numeroCartao: string;
  cvv: string;
  cpfTitular: string;
  dataVenc: string;
  cliente: Cliente;
}