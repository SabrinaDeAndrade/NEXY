import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaBancariaNexy } from '../interfaces/ContaBancariaNexy';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaNexyService {
   private baseUrl = 'http://localhost:8080/contas-bancarias';

  constructor(private http: HttpClient) {}

  listar(): Observable<ContaBancariaNexy[]> {
    return this.http.get<ContaBancariaNexy[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<ContaBancariaNexy> {
    return this.http.get<ContaBancariaNexy>(`${this.baseUrl}/${id}`);
  }

  salvar(conta: ContaBancariaNexy): Observable<ContaBancariaNexy> {
    return this.http.post<ContaBancariaNexy>(this.baseUrl, conta);
  }

  atualizar(id: number, conta: ContaBancariaNexy): Observable<ContaBancariaNexy> {
    return this.http.put<ContaBancariaNexy>(`${this.baseUrl}/${id}`, conta);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

