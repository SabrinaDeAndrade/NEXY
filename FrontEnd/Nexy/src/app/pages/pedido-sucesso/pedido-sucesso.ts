import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pedido } from '../../interfaces/Pedido';
import { PedidoService } from '../../services/pedidoService';

@Component({
  selector: 'app-pedido-sucesso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pedido-sucesso.html',
  styleUrl: './pedido-sucesso.css'
})
export class PedidoSucesso implements OnInit {

  pedido: Pedido | null = null;
  carregando = true;
  erro = false;

  constructor(
    private route: ActivatedRoute, // Para ler os parâmetros da URL
    private pedidoService: PedidoService // Para buscar os dados do pedido
  ) {}

  ngOnInit(): void {
    // 1. Pega o 'id' da URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // 2. Chama o serviço para buscar o pedido com esse ID
      this.pedidoService.buscarPorId(Number(id)).subscribe({
        next: (pedidoEncontrado) => {
          this.pedido = pedidoEncontrado;
          this.carregando = false;
        },
        error: (err) => {
          console.error("Erro ao buscar o pedido:", err);
          this.carregando = false;
          this.erro = true;
        }
      });
    } else {
      // Caso não encontre um ID na URL
      this.carregando = false;
      this.erro = true;
    }
  }
}