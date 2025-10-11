import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PedidoItem {
  
private baseUrl = 'http://localhost:8080/pedido-itens';

  constructor(private http: HttpClient) { }


  listarTodos(): Observable<PedidoItem[]> {
    return this.http.get<PedidoItem[]>(this.baseUrl);
    
  }

  buscarPorId(id: number): Observable<PedidoItem> {
    return this.http.get<PedidoItem>(`${this.baseUrl}/${id}`);
  }

  buscarPorPedido(pedidoId: number): Observable<PedidoItem[]> {
    return this.http.get<PedidoItem[]>(`${this.baseUrl}/pedido/${pedidoId}`);
  }


  criar(item: PedidoItem): Observable<PedidoItem> {
    return this.http.post<PedidoItem>(this.baseUrl, item);
  }

  atualizar(id: number, item: PedidoItem): Observable<PedidoItem> {
    return this.http.put<PedidoItem>(`${this.baseUrl}/${id}`, item);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
