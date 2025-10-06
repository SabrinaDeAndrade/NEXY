import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({

  providedIn: 'root'
})
export class CarrinhoItem {
   private baseUrl = 'http://localhost:8080/carrinho-itens';

  constructor(private http: HttpClient) { }

  // Listar todos os itens do carrinho
  listarTodos(): Observable<CarrinhoItem[]> {
    return this.http.get<CarrinhoItem[]>(this.baseUrl);
  }

  // Buscar item por ID
  buscarPorId(id: number): Observable<CarrinhoItem> {
    return this.http.get<CarrinhoItem>(`${this.baseUrl}/${id}`);
  }

  // Buscar itens por carrinho
  buscarPorCarrinho(carrinhoId: number): Observable<CarrinhoItem[]> {
    return this.http.get<CarrinhoItem[]>(`${this.baseUrl}/carrinho/${carrinhoId}`);
  }

  // Criar novo item
  criar(item: CarrinhoItem): Observable<CarrinhoItem> {
    return this.http.post<CarrinhoItem>(this.baseUrl, item);
  }

  // Atualizar item
  atualizar(id: number, item: CarrinhoItem): Observable<CarrinhoItem> {
    return this.http.put<CarrinhoItem>(`${this.baseUrl}/${id}`, item);
  }

  // Deletar item
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
