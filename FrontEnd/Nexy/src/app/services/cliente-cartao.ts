import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClienteCartao {
  
private baseUrl = 'http://localhost:8080/clientes-cartao';

  constructor(private http: HttpClient) { }


  listarTodos(): Observable<ClienteCartao[]> {
    return this.http.get<ClienteCartao[]>(this.baseUrl);
  }


  buscarPorId(id: number): Observable<ClienteCartao> {
    return this.http.get<ClienteCartao>(`${this.baseUrl}/${id}`);
  }

  buscarPorCliente(clienteId: number): Observable<ClienteCartao[]> {
    return this.http.get<ClienteCartao[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }


  criar(cartao: ClienteCartao): Observable<ClienteCartao> {
    return this.http.post<ClienteCartao>(this.baseUrl, cartao);
  }

  atualizar(id: number, cartao: ClienteCartao): Observable<ClienteCartao> {
    return this.http.put<ClienteCartao>(`${this.baseUrl}/${id}`, cartao);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}