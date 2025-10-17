import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pedido } from '../../interfaces/Pedido';
import { PedidoService } from '../../services/pedidoService';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {

  pedidos: Pedido[] = [];
  carregando = true;
  erro = false;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1. Pega o ID do cliente logado a partir do AuthService
    const clienteId = this.authService.getClienteId();

    if (clienteId) {
      // 2. Se o ID existir, busca os pedidos na API
      this.pedidoService.buscarPorCliente(clienteId).subscribe({
        next: (pedidosEncontrados) => {
          this.pedidos = pedidosEncontrados;
          this.carregando = false;
        },
        error: (err) => {
          console.error("Erro ao buscar pedidos:", err);
          this.carregando = false;
          this.erro = true;
        }
      });
    } else {
      // Este caso não deveria acontecer por causa do authGuard, mas é uma segurança extra
      console.error("Não foi possível obter o ID do cliente.");
      this.carregando = false;
      this.erro = true;
    }
  }
}