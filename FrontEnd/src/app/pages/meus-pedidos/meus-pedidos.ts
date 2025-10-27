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
    const clienteId = this.authService.getClienteId();

    if (clienteId) {
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
      console.error("Não foi possível obter o ID do cliente.");
      this.carregando = false;
      this.erro = true;
    }
  }
}