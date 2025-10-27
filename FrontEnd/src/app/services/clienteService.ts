import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../interfaces/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
private baseUrl = 'http://localhost:8080/clientes'; 

  constructor(private http: HttpClient) { }


  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }


  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }


  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  login(email: string, senha: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, { email, senha });
  }
}