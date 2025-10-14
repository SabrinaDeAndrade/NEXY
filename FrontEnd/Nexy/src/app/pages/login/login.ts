import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { CarrinhoStateService } from '../../services/carrinho-state-service';
import { Cliente } from '../../interfaces/Cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carrinhoStateService: CarrinhoStateService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        // CORRIGIDO: Adiciona o tipo do parâmetro
        next: (clienteLogado: Cliente) => {
          console.log('Login bem-sucedido!', clienteLogado);
          alert('Login realizado com sucesso!');
          this.carrinhoStateService.sincronizarCarrinhoAoLogar(clienteLogado.id);
          this.router.navigate(['/']);
        },
        // CORRIGIDO: Adiciona o tipo do erro
        error: (err: HttpErrorResponse) => {
          console.error('Erro no login:', err);
          alert('Erro: Email ou senha inválidos.');
        }
      });
    }
  }
}