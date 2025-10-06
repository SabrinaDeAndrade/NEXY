import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Cliente {
  
private baseUrl = 'http://localhost:8080/clientes'; 

  constructor(private http: HttpClient) { }

  // Listar todos os clientes
  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  // Buscar cliente por ID
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // Criar novo cliente
  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  // Atualizar cliente
  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  // Deletar cliente
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Login
  login(email: string, senha: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, { email, senha });
  }
}