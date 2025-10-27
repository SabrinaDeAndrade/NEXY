import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/Cliente';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-admin.html',
  styleUrl: './cadastro-admin.css'
})
export class CadastroAdmin implements OnInit {
  admins: Cliente[] = [];
  adminEditando: Partial<Cliente> | null = null;
  novoAdmin: Partial<Cliente> | null = null;
  confirmarSenhaEdicao: string = '';
  confirmarSenhaNovo: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getTipoUsuario() !== 'ADMIN') {
      this.router.navigate(['/']); // Redireciona se não for admin
      return;
    }
    this.carregarAdmins();
  }

  iniciarCadastro(): void {

    this.novoAdmin = { nome: '', email: '', senha: '', cpf: '', telefone: '' };
    this.adminEditando = null;
    this.confirmarSenhaNovo = '';
  }

  carregarAdmins(): void {
    this.authService.getAdmins().subscribe({
      next: (data) => this.admins = data,
      error: (err) => alert('Erro ao carregar admins: ' + err.error)
    });
  }

  editarAdmin(admin: Cliente): void {
    this.adminEditando = { ...admin };
  }
  salvarNovoAdmin(): void {
    if (!this.novoAdmin) return;

    if (!this.novoAdmin.nome || !this.novoAdmin.email || !this.novoAdmin.senha) {
      alert('Nome, Email e Senha são obrigatórios.');
      return;
    }

    if (this.novoAdmin.senha !== this.confirmarSenhaNovo) {
      alert('As senhas não coincidem!');
      return;
    }

    this.authService.registrarAdmin(this.novoAdmin).subscribe({
      next: () => {
        alert('Novo admin cadastrado com sucesso!');
        this.novoAdmin = null; // Esconde o formulário de cadastro
        this.carregarAdmins(); // Recarrega a lista
      },
      error: (err) => alert('Erro ao cadastrar: ' + err.error)
    });
  }

  cancelarCadastro(): void {
    this.novoAdmin = null;
  }


  salvarEdicao(): void {
    if (this.adminEditando && this.adminEditando.id) {

      const dadosParaEnviar = { ...this.adminEditando };
      if (!dadosParaEnviar.senha) {
        delete dadosParaEnviar.senha;
      } else if (dadosParaEnviar.senha !== this.confirmarSenhaEdicao) {
        alert('Senhas não coincidem!');
        return;
      }

      this.authService.updateAdmin(this.adminEditando.id, this.adminEditando).subscribe({
        next: () => {
          alert('Admin atualizado!');
          this.adminEditando = null;
          this.confirmarSenhaEdicao = '';
          this.carregarAdmins();
        },
        error: (err) => alert('Erro ao atualizar: ' + err.error)
      });
    }
  }
  cancelarEdicao(): void {
    this.adminEditando = null;
    this.confirmarSenhaEdicao = '';
  }

  excluirAdmin(id: number): void {
    if (confirm('Tem certeza que deseja excluir este admin?')) {
      this.authService.deleteAdmin(id).subscribe({
        next: () => {
          alert('Admin excluído!');
          this.carregarAdmins();
        },
        error: (err) => alert('Erro ao excluir: ' + err.error)
      });
    }
  }
}


