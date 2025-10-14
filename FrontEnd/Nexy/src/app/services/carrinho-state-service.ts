import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, switchMap } from 'rxjs';
import { CarrinhoItem } from '../interfaces/CarrinhoItem';
import { CarrinhoService } from './carrinhoService';
import { CarrinhoItemService } from './carrinho-itemService';
import { CarrinhoLocalStorageService } from './carrinho-local-storage';
import { Produto } from '../interfaces/Produto';
import { Carrinho } from '../pages/carrinho/carrinho';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoStateService {
 private itensSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  public itens$: Observable<CarrinhoItem[]> = this.itensSubject.asObservable();
  private carrinhoId: number | null = null;

  constructor(
    private carrinhoService: CarrinhoService,
    private carrinhoItemService: CarrinhoItemService,
    private carrinhoLocalStorage: CarrinhoLocalStorageService,
    private authService: AuthService
  ) {
    this.inicializar();
  }

  private inicializar(): void {
    // CORRIGIDO: Usa o Observable público
    this.authService.isLoggedIn$.subscribe(logado => {
      // CORRIGIDO: Usa o método público para pegar o ID
      const clienteId = this.authService.getClienteId();
      if (logado && clienteId) {
        this.carregarCarrinhoDaApi(clienteId);
      } else {
        const itensLocais = this.carrinhoLocalStorage.getItens();
        this.itensSubject.next(itensLocais);
      }
    });
  }

  private carregarCarrinhoDaApi(clienteId: number): void {
    this.carrinhoService.buscarPorCliente(clienteId).subscribe(carrinho => {
      this.carrinhoId = carrinho.id;
      this.itensSubject.next(carrinho.itens || []);
    });
  }

  public adicionarAoCarrinho(produto: Produto, quantidade: number): void {
    // CORRIGIDO: Usa o método público
    if (this.authService.isLoggedIn()) {
      if (!this.carrinhoId) {
        console.error("ID do carrinho não encontrado para usuário logado.");
        return;
      }
      const novoItem: Partial<CarrinhoItem> = {
        produto: { id: produto.id } as Produto,
        quantidade,
        precoUnitario: produto.preco,
        // CORRIGIDO: Usa um "type cast" para satisfazer o tipo Carrinho
        carrinho: { id: this.carrinhoId } as Carrinho
      };
      this.carrinhoItemService.criar(novoItem as CarrinhoItem).subscribe(() => {
        // CORRIGIDO: Usa o método público para pegar o ID
        const clienteId = this.authService.getClienteId();
        if(clienteId) this.carregarCarrinhoDaApi(clienteId);
      });
    } else {
      this.carrinhoLocalStorage.adicionarItem(produto, quantidade);
      this.itensSubject.next(this.carrinhoLocalStorage.getItens());
    }
    alert(`"${produto.nome}" adicionado ao carrinho!`);
  }

  public sincronizarCarrinhoAoLogar(clienteId: number): void {
    const itensLocais = this.carrinhoLocalStorage.getItens();
    if (itensLocais.length === 0) {
      this.carregarCarrinhoDaApi(clienteId);
      return;
    }

    this.carrinhoService.buscarPorCliente(clienteId).pipe(
      switchMap(carrinho => {
        this.carrinhoId = carrinho.id;
        
        const chamadasDeCriacao = itensLocais.map(itemLocal => {
          // CORRIGIDO: Checagem para garantir que carrinhoId não é nulo
          if (!this.carrinhoId) {
             throw new Error("ID do carrinho nulo durante sincronização");
          }
          const novoItemApi: Partial<CarrinhoItem> = {
            produto: { id: itemLocal.produto.id } as Produto,
            quantidade: itemLocal.quantidade,
            precoUnitario: itemLocal.produto.preco,
            carrinho: { id: this.carrinhoId } as Carrinho
          };
          return this.carrinhoItemService.criar(novoItemApi as CarrinhoItem);
        });

        return forkJoin(chamadasDeCriacao);
      })
    ).subscribe({
      next: () => {
        console.log('Carrinho local sincronizado com sucesso!');
        this.carrinhoLocalStorage.limparCarrinho();
        this.carregarCarrinhoDaApi(clienteId);
      },
      error: (err) => console.error("Falha ao sincronizar carrinho:", err)
    });
  }
}