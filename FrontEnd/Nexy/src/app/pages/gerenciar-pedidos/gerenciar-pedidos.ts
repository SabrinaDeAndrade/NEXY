import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../interfaces/Pedido';
import { StatusPedido } from '../../interfaces/StatusPedido';
import { PedidoService } from '../../services/pedidoService';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-pedidos.html',
  styleUrl: './gerenciar-pedidos.css'
})
export class GerenciarPedidos implements OnInit {

  public pedidos: Pedido[] = [];
  public carregando = true;
  public statusOptions: string[] = Object.values(StatusPedido);

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.carregando = true;
    // CORREÇÃO: Confirme que o nome do método no seu PedidoService é getPedidos
    this.pedidoService.getPedidos().subscribe({
      // CORREÇÃO: Adicione o tipo Pedido[] para 'dados'
      next: (dados: Pedido[]) => { 
        this.pedidos = dados;
        this.carregando = false;
        console.log("Pedidos carregados:", this.pedidos);
      },
      // CORREÇÃO: Adicione o tipo HttpErrorResponse (ou any) para 'err'
      error: (err: HttpErrorResponse) => { 
        console.error("Erro ao carregar pedidos:", err);
        // Tenta mostrar uma mensagem mais útil do erro vindo do backend
        const errorMsg = err.error?.erro || err.error?.message || err.message || 'Erro desconhecido.';
        alert(`Erro ao carregar pedidos: ${errorMsg}`);
        this.carregando = false;
      }
    });
  }

   onStatusChange(pedido: Pedido): void {
    const novoStatusString = pedido.status;
    const pedidoId = pedido.id;

    const pedidoOriginal = this.pedidos.find(p => p.id === pedidoId);
    const statusAntigo = pedidoOriginal ? pedidoOriginal.status : null;

    console.log(`Tentando atualizar pedido ${pedidoId} de ${statusAntigo} para status ${novoStatusString}`);

    const novoStatusEnum = novoStatusString as StatusPedido;

    this.pedidoService.atualizarStatusPedido(pedidoId, novoStatusEnum).subscribe({
      next: (pedidoAtualizado: Pedido) => {
        alert(`Status do pedido #${pedidoId} atualizado para ${novoStatusEnum}!`);

        const index = this.pedidos.findIndex(p => p.id === pedidoId);
        if (index !== -1) {
          this.pedidos[index] = pedidoAtualizado;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error("Erro ao atualizar status:", err);
        const errorMsg = err.error?.erro || err.error?.message || err.message || 'Erro desconhecido.';
        alert(`Erro ao atualizar status: ${errorMsg}`);


        const index = this.pedidos.findIndex(p => p.id === pedidoId);
        if (index !== -1 && statusAntigo) {

           this.pedidos[index] = { ...this.pedidos[index], status: statusAntigo };

        }
      }
    });
  }

 verDetalhes(pedidoId: number): void {
    console.log("Navegando para detalhes do pedido:", pedidoId);
    this.router.navigate(['admin/gerenciar-pedido-detalhes', pedidoId]);
  }
}