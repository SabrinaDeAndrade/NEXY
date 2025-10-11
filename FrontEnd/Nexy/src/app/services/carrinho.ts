import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({

  providedIn: 'root'
})
export class Carrinho {
 private baseUrl = 'http://localhost:8080/carrinhos';

  constructor(private http: HttpClient) { }


  listarTodos(): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.baseUrl}/${id}`);
  }

  buscarPorCliente(clienteId: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  criar(carrinho: Carrinho): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.baseUrl, carrinho);
  }


  atualizar(id: number, carrinho: Carrinho): Observable<Carrinho> {
    return this.http.put<Carrinho>(`${this.baseUrl}/${id}`, carrinho);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}