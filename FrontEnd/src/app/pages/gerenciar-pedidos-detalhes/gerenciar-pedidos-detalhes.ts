import { CommonModule, Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pedido } from '../../interfaces/Pedido';
import { PedidoService } from '../../services/pedidoService';
import { switchMap } from 'rxjs';
import { AdminStateService } from '../../services/admin-state-service';

@Component({
  selector: 'app-gerenciar-pedidos-detalhes',
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciar-pedidos-detalhes.html',
  styleUrl: './gerenciar-pedidos-detalhes.css'
})
export class GerenciarPedidosDetalhes implements OnInit {
pedido: Pedido | null = null;
  carregando = true;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router,
    private adminStateService: AdminStateService,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log("ngOnInit de Detalhes do Pedido iniciado."); // Log Adicional
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log("ID do pedido na rota:", id); // Log Adicional
        if (!id) {
          this.erro = 'ID do pedido não encontrado na rota.';
          this.carregando = false;
          console.error(this.erro); // Log erro
          return []; 
        }
        this.carregando = true;
        this.erro = null;
        console.log("A buscar pedido com ID:", id); // Log Adicional
        // Confirme se buscarPorIdAdmin é o método correto
        return this.pedidoService.buscarPorId(+id); 
      })
    ).subscribe({
        next: (dados) => {
          this.pedido = dados;
          this.carregando = false;
          console.log("Detalhes do pedido carregados:", this.pedido); 
        },
        error: (err) => {
          console.error("Erro ao carregar detalhes do pedido:", err);
          this.erro = "Não foi possível carregar os detalhes do pedido.";
          this.carregando = false;
        }
    });
  }

  goBack(): void {
    this.adminStateService.setActiveView('pedidos');
    this.location.back();
  }
}
