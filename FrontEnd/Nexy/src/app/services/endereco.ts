import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Endereco {
  
private baseUrl = 'http://localhost:8080/enderecos';

  constructor(private http: HttpClient) { }

  // Listar todos os endereços
  listarTodos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.baseUrl);
  }

  // Buscar endereço por ID
  buscarPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/${id}`);
  }

  // Buscar endereços por cliente
  buscarPorCliente(clienteId: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  // Criar novo endereço
  criar(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.baseUrl, endereco);
  }

  // Atualizar endereço
  atualizar(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.baseUrl}/${id}`, endereco);
  }

  // Deletar endereço
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}