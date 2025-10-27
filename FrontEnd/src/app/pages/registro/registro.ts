import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
    registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso! Por favor, faça o login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro no registro:', err);
          alert(`Erro: ${err.error || 'Não foi possível realizar o cadastro.'}`);
        }
      });
    }
  }
}
