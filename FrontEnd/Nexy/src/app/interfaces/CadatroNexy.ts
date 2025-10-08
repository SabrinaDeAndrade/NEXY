import { ContaBancariaNexy } from "./ContaBancariaNexy";


export interface CadastroNexy {
  id?: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  contasBancarias: ContaBancariaNexy[];
}