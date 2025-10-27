import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';

export interface LoginResponseDTO {
  clienteId: number;
  nomeCliente: string;
  tipoUsuario: string;
  mensagem: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private sessionKey = 'nexy_user_session';

  // BehaviorSubjects privados para controlar o estado internamente
  private loggedIn = new BehaviorSubject<boolean>(false);
  private clienteId = new BehaviorSubject<number | null>(null);
  private tipoUsuario = new BehaviorSubject<string | null>(null);

  // Observables públicos para que outros componentes possam reagir às mudanças
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.carregarEstadoDaSessao();
  }

  private carregarEstadoDaSessao(): void {
    const sessaoSalva = localStorage.getItem(this.sessionKey);
    if (sessaoSalva) {
      try {
        const dadosLogin: LoginResponseDTO = JSON.parse(sessaoSalva);
        if (dadosLogin && dadosLogin.clienteId) {
          // Se os dados são válidos, atualiza o estado da aplicação
          this.loggedIn.next(true);
          this.clienteId.next(dadosLogin.clienteId);
          this.tipoUsuario.next(dadosLogin.tipoUsuario);
        } else {
          this.logout();
        }
      } catch (e) {
        console.error("Dados de sessão inválidos, deslogando.", e);
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
        localStorage.setItem(this.sessionKey, JSON.stringify(response));

        this.loggedIn.next(true);
        this.clienteId.next(response.clienteId);
        this.tipoUsuario.next(response.tipoUsuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.loggedIn.next(false);
    this.clienteId.next(null);
    this.tipoUsuario.next(null);
  }

  public getToken(): string | null {
    const sessaoSalva = localStorage.getItem(this.sessionKey);
    if (!sessaoSalva) {
      return null;
    }
    try {
      const dadosLogin: LoginResponseDTO = JSON.parse(sessaoSalva);
      return dadosLogin.token || null;
    } catch (e) {
      return null;
    }
  }

  public getClienteId(): number | null {
    return this.clienteId.getValue();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  registrarAdmin(cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/admin/register`, cliente);
  }

  getAdmins(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/admins`);
  }

  updateAdmin(id: number, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/admins/${id}`, cliente);
  }
  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admins/${id}`);
  }

  public getTipoUsuario(): string | null {
    return this.tipoUsuario.getValue();
  }
}