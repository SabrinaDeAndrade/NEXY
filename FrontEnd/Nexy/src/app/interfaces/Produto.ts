import { Categoria } from "./Categorias";
import { ImagemProduto } from "./ImagemProduto";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  estoque: number;
  preco: number;
  peso: number;
  altura: number;
  largura: number;
  imagens: ImagemProduto[]; 
  categoria: Categoria
}