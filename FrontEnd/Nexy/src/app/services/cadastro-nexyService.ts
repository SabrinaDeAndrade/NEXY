import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CadastroNexy } from '../interfaces/CadatroNexy';

@Injectable({
  providedIn: 'root'
})
export class CadastroNexyService {
    private baseUrl = 'http://localhost:8080/cadastros-nexy';

  constructor(private http: HttpClient) {}


  buscarPorId(id: number): Observable<CadastroNexy> {
    return this.http.get<CadastroNexy>(`${this.baseUrl}/${id}`);
  }

  salvar(cadastro: CadastroNexy): Observable<CadastroNexy> {
    return this.http.post<CadastroNexy>(this.baseUrl, cadastro);
  }

  atualizar(id: number, cadastro: CadastroNexy): Observable<CadastroNexy> {
    return this.http.put<CadastroNexy>(`${this.baseUrl}/${id}`, cadastro);
  }

}

