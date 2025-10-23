import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaGerenciamento } from '../../components/listas/lista-gerenciamento/lista-gerenciamento';
import { GerenciarCategorias } from '../gerenciar-categorias/gerenciar-categorias';
import { GerenciarProdutos } from '../gerenciar-produtos/gerenciar-produtos';
import { CadastroAdmin } from '../cadastro-admin/cadastro-admin';
import { ProdutoForm } from "../../components/form/produto-form/produto-form";

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [CommonModule, ListaGerenciamento, GerenciarCategorias, GerenciarProdutos, CadastroAdmin, ProdutoForm, RouterOutlet,],
  templateUrl: './gerenciamento.html',
  styleUrl: './gerenciamento.css'
})
export class Gerenciamento {

  currentView: string = 'produtos';

  editingProductId: number | null = null;

  onViewChange(viewName: string): void {
    console.log('Gerenciamento: Evento recebido da sidebar ->', viewName);
    this.currentView = viewName; 
    this.editingProductId = null; 
    console.log('Gerenciamento: currentView atualizada para ->', this.currentView); 
  }
 
 onRequestProdutoForm(event: { view: string, id?: number }): void { 
    console.log('Gerenciamento: Pedido para abrir formulário de produto ->', event);
    this.currentView = event.view; // Set view to 'produtoForm'
    this.editingProductId = event.id ?? null; // Set the ID or null
  }

  onProdutoFormClosed(): void {
    console.log('Gerenciamento: Formulário de produto fechado, voltando para a lista.');
    this.currentView = 'produtos'; // Volta para a lista de produtos
    this.editingProductId = null;
  }
}
