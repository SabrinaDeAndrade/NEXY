import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaGerenciamento } from '../../components/listas/lista-gerenciamento/lista-gerenciamento';
import { GerenciarCategorias } from '../gerenciar-categorias/gerenciar-categorias';
import { GerenciarProdutos } from '../gerenciar-produtos/gerenciar-produtos';
import { CadastroAdmin } from '../cadastro-admin/cadastro-admin';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [CommonModule,  ListaGerenciamento,GerenciarCategorias,GerenciarProdutos,CadastroAdmin],
  templateUrl: './gerenciamento.html',
  styleUrl: './gerenciamento.css'
})
export class Gerenciamento {

  currentView: string = 'produtos';

 
  onViewChange(viewName: string): void {
    console.log('Gerenciamento: Evento recebido ->', viewName); // Log para confirmar
    this.currentView = viewName;
    console.log('Gerenciamento: currentView atualizada ->', this.currentView); // Log para confirmar
  }
}
