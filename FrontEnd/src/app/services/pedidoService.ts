import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pedido } from "../interfaces/Pedido";
import { StatusPedido } from "../interfaces/StatusPedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
private baseUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) { }


  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }


  buscarPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }


  buscarPorCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  criar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }

  atualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${id}`, pedido);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl); 
  }
  atualizarStatusPedido(pedidoId: number, novoStatus: StatusPedido): Observable<Pedido> {
    const url = `${this.baseUrl}/${pedidoId}/status`;
    return this.http.put<Pedido>(url, { status: novoStatus }); 
  }

  
}