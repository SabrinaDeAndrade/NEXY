import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/Categorias';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/categorias'; 

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  criar(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }
  public atualizar(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }
   public deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}