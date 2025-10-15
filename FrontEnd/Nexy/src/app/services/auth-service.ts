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
  private loggedIn = new BehaviorSubject<boolean>(false);
  private clienteId = new BehaviorSubject<number | null>(null);

  // Expõe os Observables como públicos para que outros possam se inscrever
  public isLoggedIn$ = this.loggedIn.asObservable();
  public clienteId$ = this.clienteId.asObservable();

  constructor(private http: HttpClient) { 
    this.carregarEstadoDoToken();
  }

  
private carregarEstadoDoToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // Decodifica o token para extrair os dados.
        // ATENÇÃO: btoa/atob funciona para tokens simulados. Para JWT real, use uma biblioteca.
        const dadosLogin: LoginResponseDTO = JSON.parse(atob(token));

        if (dadosLogin && dadosLogin.clienteId) {
          this.loggedIn.next(true);
          this.clienteId.next(dadosLogin.clienteId);
        } else {
          // Se o token for inválido, limpa tudo
          this.logout();
        }
      } catch (e) {
        console.error("Token salvo é inválido, deslogando.", e);
        this.logout();
      }
    }
  }

  registrar(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/register`, cliente);
  }

  login(credenciais: { email: string, senha: string }): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}/login`, credenciais).pipe(
      tap(response => {
        // Salva a resposta completa (ou o token JWT) no LocalStorage
        const tokenParaSalvar = btoa(JSON.stringify(response));
        localStorage.setItem(this.tokenKey, tokenParaSalvar);
        
        this.loggedIn.next(true);
        this.clienteId.next(response.clienteId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.clienteId.next(null);
  }
  
  public getClienteId(): number | null {
    return this.clienteId.getValue();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
}