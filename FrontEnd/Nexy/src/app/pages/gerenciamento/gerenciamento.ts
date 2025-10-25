import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListaGerenciamento } from '../../components/listas/lista-gerenciamento/lista-gerenciamento';
import { GerenciarCategorias } from '../gerenciar-categorias/gerenciar-categorias';
import { GerenciarProdutos } from '../gerenciar-produtos/gerenciar-produtos';
import { CadastroAdmin } from '../cadastro-admin/cadastro-admin';
import { ProdutoForm } from "../../components/form/produto-form/produto-form";
import { GerenciarPedidos } from '../gerenciar-pedidos/gerenciar-pedidos';
import { GerenciarPedidosDetalhes } from '../gerenciar-pedidos-detalhes/gerenciar-pedidos-detalhes';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStateService } from '../../services/admin-state-service';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [CommonModule, 
    ListaGerenciamento, 
    GerenciarCategorias, 
    GerenciarProdutos, 
    CadastroAdmin, 
    ProdutoForm, 
    GerenciarPedidos,
    GerenciarPedidosDetalhes,

  ],
  templateUrl: './gerenciamento.html',
  styleUrl: './gerenciamento.css'
})
export class Gerenciamento implements OnInit { 
currentView: string = 'produtos'; 
  editingProductId: number | null = null; 

  // 2. Injete o AdminStateService
  constructor(private adminStateService: AdminStateService) {} 

  // 3. No ngOnInit, leia o estado guardado no serviço
  ngOnInit(): void {
    console.log('Gerenciamento: ngOnInit INICIADO.');
    this.currentView = this.adminStateService.getActiveView();
    console.log('Gerenciamento: ngOnInit - Vista inicial lida do serviço ->', this.currentView);
    this.editingProductId = null; 
    console.log('Gerenciamento: ngOnInit FINALIZADO.');
  }

  // 4. Quando a vista muda (via sidebar), atualize o serviço
  onViewChange(viewName: string): void {
    console.log(`Gerenciamento: onViewChange -> ${viewName}`); 
    this.currentView = viewName; 
    this.adminStateService.setActiveView(viewName); // <<< Atualiza o serviço
    this.editingProductId = null; 
  }

  // 5. Quando entra no formulário, atualize o serviço
  onRequestProdutoForm(event: { view: string, id?: number }): void { 
     console.log('Gerenciamento: Pedido form produto ->', event);
     this.currentView = event.view; // 'produtoForm'
     this.adminStateService.setActiveView(event.view); // <<< Atualiza o serviço
     this.editingProductId = event.id ?? null;
  }

  // 6. Quando sai do formulário, atualize o serviço para a vista de lista
  onProdutoFormClosed(): void {
    console.log('Gerenciamento: Form produto fechado.');
    const previousView = this.adminStateService.getActiveView() === 'produtoForm' ? 'produtos' : this.adminStateService.getActiveView(); // Volta para a lista anterior ou produtos
    this.currentView = previousView; 
    this.adminStateService.setActiveView(previousView); // <<< Atualiza o serviço
    this.editingProductId = null;
  }
}
