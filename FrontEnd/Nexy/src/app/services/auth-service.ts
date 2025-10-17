import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/Cliente';

export interface LoginResponseDTO {
  clienteId: number;
  nomeCliente: string;
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

  // Observables públicos para que outros componentes possam reagir às mudanças
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // Ao iniciar o serviço, tenta carregar a sessão salva
    this.carregarEstadoDaSessao();
  }

  /**
   * Lê os dados da sessão do LocalStorage, valida e restaura o estado de login.
   */
  private carregarEstadoDaSessao(): void {
    const sessaoSalva = localStorage.getItem(this.sessionKey);
    if (sessaoSalva) {
      try {
        const dadosLogin: LoginResponseDTO = JSON.parse(sessaoSalva);
        if (dadosLogin && dadosLogin.clienteId) {
          // Se os dados são válidos, atualiza o estado da aplicação
          this.loggedIn.next(true);
          this.clienteId.next(dadosLogin.clienteId);
          console.log(`Sessão restaurada para o cliente ID: ${dadosLogin.clienteId}`);
        } else {
          this.logout(); // Limpa se os dados estiverem corrompidos
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
        // Salva a resposta completa do login no LocalStorage
        localStorage.setItem(this.sessionKey, JSON.stringify(response));
        
        // Atualiza o estado em tempo real
        this.loggedIn.next(true);
        this.clienteId.next(response.clienteId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.loggedIn.next(false);
    this.clienteId.next(null);
  }
  
  // Métodos públicos para obter os valores atuais de forma segura
  public getClienteId(): number | null {
    return this.clienteId.getValue();
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
}