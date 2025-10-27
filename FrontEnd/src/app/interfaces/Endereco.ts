import { Cliente } from "./Cliente";

export interface Endereco {
  id: number;
  rua: string;
  bairro: string;
  estado: string;
  cep: string;
  cidade: string;
  numero: number;
  complemento: string;
  cliente: Cliente;
}