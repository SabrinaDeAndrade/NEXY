import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClienteCartao {
  
private baseUrl = 'http://localhost:8080/clientes-cartao';

  constructor(private http: HttpClient) { }

  // Listar todos os cartões
  listarTodos(): Observable<ClienteCartao[]> {
    return this.http.get<ClienteCartao[]>(this.baseUrl);
  }

  // Buscar cartão por ID
  buscarPorId(id: number): Observable<ClienteCartao> {
    return this.http.get<ClienteCartao>(`${this.baseUrl}/${id}`);
  }

  // Buscar cartões por cliente
  buscarPorCliente(clienteId: number): Observable<ClienteCartao[]> {
    return this.http.get<ClienteCartao[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  // Criar novo cartão
  criar(cartao: ClienteCartao): Observable<ClienteCartao> {
    return this.http.post<ClienteCartao>(this.baseUrl, cartao);
  }

  // Atualizar cartão
  atualizar(id: number, cartao: ClienteCartao): Observable<ClienteCartao> {
    return this.http.put<ClienteCartao>(`${this.baseUrl}/${id}`, cartao);
  }

  // Deletar cartão
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}