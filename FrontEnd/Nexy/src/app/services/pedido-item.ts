import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PedidoItem {
  
private baseUrl = 'http://localhost:8080/pedido-itens';

  constructor(private http: HttpClient) { }

  // Listar todos os itens de pedidos
  listarTodos(): Observable<PedidoItem[]> {
    return this.http.get<PedidoItem[]>(this.baseUrl);
    
  }

  // Buscar item por ID
  buscarPorId(id: number): Observable<PedidoItem> {
    return this.http.get<PedidoItem>(`${this.baseUrl}/${id}`);
  }

  // Buscar itens por pedido
  buscarPorPedido(pedidoId: number): Observable<PedidoItem[]> {
    return this.http.get<PedidoItem[]>(`${this.baseUrl}/pedido/${pedidoId}`);
  }

  // Criar novo item de pedido
  criar(item: PedidoItem): Observable<PedidoItem> {
    return this.http.post<PedidoItem>(this.baseUrl, item);
  }

  // Atualizar item de pedido
  atualizar(id: number, item: PedidoItem): Observable<PedidoItem> {
    return this.http.put<PedidoItem>(`${this.baseUrl}/${id}`, item);
  }

  // Deletar item de pedido
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
