import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Endereco } from "../interfaces/Endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  
private baseUrl = 'http://localhost:8080/enderecos';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/${id}`);
  }


  buscarPorCliente(clienteId: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseUrl}/cliente/${clienteId}`);
  }

  criar(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.baseUrl, endereco);
  }


  atualizar(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.baseUrl}/${id}`, endereco);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}