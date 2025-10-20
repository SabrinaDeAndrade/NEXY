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
        next: (resposta: LoginResponseDTO) => {
          console.log('Login bem-sucedido!', resposta);
          alert('Login realizado com sucesso!');

          // 🧩 Verifica o tipo de usuário e redireciona
          if (resposta.tipoUsuario === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.carrinhoStateService.sincronizarCarrinhoAoLogar(resposta.clienteId);
            this.router.navigate(['/']);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro no login:', err);
          alert('Erro: Email ou senha inválidos.');
        }
      });
    }
  }
}