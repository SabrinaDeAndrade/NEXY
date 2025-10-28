import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produto } from "../interfaces/Produto";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = 'http://localhost:8080/produtos'; 


  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/${id}`, produto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

   uploadImagens(id: number, arquivos: File[]): Observable<HttpEvent<any>> {
    const formData = new FormData();

    for (let i = 0; i < arquivos.length; i++) {
        formData.append('imagens', arquivos[i]);
    }

    const req = new HttpRequest('POST', `${this.baseUrl}/${id}/upload-imagens`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public deletarImagem(imagemId: number): Observable<void> {
    const urlDelecao = `http://localhost:8080/produtos/imagens/${imagemId}`;
    return this.http.delete<void>(urlDelecao);
  }

  getProductsByCategoryId(categoryId: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}?categoriaId=${categoryId}`);
  }
}
