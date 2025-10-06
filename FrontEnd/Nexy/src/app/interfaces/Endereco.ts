import { Cliente } from "./Cliente";

export interface Endereco {
  id: number;
  rua: string;
  bairro: string;
  estado: string;
  numero: number;
  complemento: string;
  cliente: Cliente;
}