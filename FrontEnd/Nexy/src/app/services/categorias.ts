import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/Categorias';

@Injectable({
  providedIn: 'root'
})
export class Categorias {
  private apiUrl = 'http://localhost:8080/categorias'; 

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}