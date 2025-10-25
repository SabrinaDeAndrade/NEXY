import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedidoService';
import { Pedido } from '../../interfaces/Pedido';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pedido-detalhes.html',
  styleUrl: './pedido-detalhes.css'
})
export class PedidoDetalhes implements OnInit {

  pedido: Pedido | null = null;
  carregando = true;
  erro = false;

  constructor(
    private route: ActivatedRoute, 
    private pedidoService: PedidoService 
  ) {}

  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {

      this.pedidoService.buscarPorId(Number(id)).subscribe({
        next: (pedidoEncontrado) => {
          this.pedido = pedidoEncontrado;
          this.carregando = false;
        },
        error: (err) => {
          console.error("Erro ao buscar detalhes do pedido:", err);
          this.carregando = false;
          this.erro = true;
        }
      });
    } else {
      console.error("ID do pedido não encontrado na URL.");
      this.carregando = false;
      this.erro = true;
    }
  }

}