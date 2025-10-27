import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarrinhoItem } from "../interfaces/CarrinhoItem";




@Injectable({

  providedIn: 'root'
})
export class CarrinhoItemService {
   private baseUrl = 'http://localhost:8080/carrinho-itens';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<CarrinhoItem[]> {
    return this.http.get<CarrinhoItem[]>(this.baseUrl);
  }


  buscarPorId(id: number): Observable<CarrinhoItem> {
    return this.http.get<CarrinhoItem>(`${this.baseUrl}/${id}`);
  }

  buscarPorCarrinho(carrinhoId: number): Observable<CarrinhoItem[]> {
    return this.http.get<CarrinhoItem[]>(`${this.baseUrl}/carrinho/${carrinhoId}`);
  }


  criar(item: CarrinhoItem): Observable<CarrinhoItem> {
    return this.http.post<CarrinhoItem>(this.baseUrl, item);
  }


  atualizar(id: number, item: CarrinhoItem): Observable<CarrinhoItem> {
    return this.http.put<CarrinhoItem>(`${this.baseUrl}/${id}`, item);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
