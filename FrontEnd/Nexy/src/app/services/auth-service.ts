import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private baseUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth_token_nexy';

  // Mantém os BehaviorSubjects como privados (boa prática)
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent());
  private clienteId = new BehaviorSubject<number | null>(null);

  // Expõe os Observables como públicos para que outros possam se inscrever
  public isLoggedIn$ = this.loggedIn.asObservable();
  public clienteId$ = this.clienteId.asObservable();

  constructor(private http: HttpClient) { }

  // CORRIGIDO: Método registrar que retorna um Observable<Cliente>
  registrar(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/register`, cliente);
  }

  // CORRIGIDO: Método login que retorna um Observable<Cliente>
  login(credenciais: { email: string, senha: string }): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, credenciais).pipe(
      tap(clienteLogado => {
        // Salva um token simulado (ou o token real da API no futuro)
        const tokenSimulado = btoa(JSON.stringify(clienteLogado));
        localStorage.setItem(this.tokenKey, tokenSimulado);
        
        this.loggedIn.next(true);
        this.clienteId.next(clienteLogado.id); // Armazena o ID do cliente
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.clienteId.next(null);
  }

  private isTokenPresent(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  
  // NOVO: Método público para obter o valor atual do ID do cliente
  public getClienteId(): number | null {
    return this.clienteId.getValue();
  }

  // NOVO: Método público para obter o valor atual do status de login
  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
}