import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../interfaces/Endereco';
import { ClienteCartao } from '../interfaces/ClienteCartao';
import { Pedido } from '../interfaces/Pedido';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // --- MÉTODOS DE ENDEREÇO ---
  getEnderecos(clienteId: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseUrl}/enderecos/cliente/${clienteId}`);
  }

  salvarEndereco(clienteId: number, endereco: Partial<Endereco>): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.baseUrl}/enderecos/cliente/${clienteId}`, endereco);
  }

  // --- MÉTODOS DE CARTÃO ---
  getCartoes(clienteId: number): Observable<ClienteCartao[]> {
    return this.http.get<ClienteCartao[]>(`${this.baseUrl}/clientes-cartao/cliente/${clienteId}`);
  }

  salvarCartao(clienteId: number, cartao: Partial<ClienteCartao>): Observable<ClienteCartao> {
    return this.http.post<ClienteCartao>(`${this.baseUrl}/clientes-cartao/cliente/${clienteId}`, cartao);
  }

  // --- MÉTODO DE FINALIZAÇÃO ---
  finalizarPedido(payload: { clienteId: number, enderecoId: number, cartaoId: number }): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/pedidos/finalizar`, payload);
  }

  

}
