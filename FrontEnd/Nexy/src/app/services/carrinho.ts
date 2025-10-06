import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({

  providedIn: 'root'
})
export class Carrinho {
 private baseUrl = 'http://localhost:8080/carrinhos';

  constructor(private http: HttpClient) { }

  // Listar todos os carrinhos
  listarTodos(): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(this.baseUrl);
  }

  // Buscar carrinho por ID
  buscarPorId(id: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.baseUrl}/${id}`);
  }

  // Buscar carrinho por cliente
  buscarPorCliente(clienteId: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  // Criar um novo carrinho
  criar(carrinho: Carrinho): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.baseUrl, carrinho);
  }

  // Atualizar carrinho
  atualizar(id: number, carrinho: Carrinho): Observable<Carrinho> {
    return this.http.put<Carrinho>(`${this.baseUrl}/${id}`, carrinho);
  }

  // Deletar carrinho
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}