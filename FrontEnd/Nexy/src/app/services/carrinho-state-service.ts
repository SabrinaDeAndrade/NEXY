import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, Observable, switchMap, take, throwError } from 'rxjs';
import { CarrinhoItem } from '../interfaces/CarrinhoItem';
import { CarrinhoService } from './carrinhoService';
import { CarrinhoItemService } from './carrinho-itemService';
import { CarrinhoLocalStorageService } from './carrinho-local-storage';
import { Produto } from '../interfaces/Produto';
import { AuthService } from './auth-service';
import { Carrinho } from '../interfaces/Carrinho';
import { HttpErrorResponse } from '@angular/common/http';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoStateService {
  private itensSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  public itens$: Observable<CarrinhoItem[]> = this.itensSubject.asObservable();
  private carrinhoIdSubject = new BehaviorSubject<number | null>(null);

  constructor(
    private carrinhoService: CarrinhoService,
    private carrinhoItemService: CarrinhoItemService,
    private carrinhoLocalStorage: CarrinhoLocalStorageService,
    private authService: AuthService
  ) {
    this.inicializar();
  }

  // Seus métodos inicializar() e garantirCarrinhoEcarregarItens() continuam aqui...
  private inicializar(): void {
    this.authService.isLoggedIn$.subscribe(logado => {
      const clienteId = this.authService.getClienteId();
      if (logado && clienteId) {
        this.garantirCarrinhoEcarregarItens(clienteId);
      } else {
        const itensLocais = this.carrinhoLocalStorage.getItens();
        this.itensSubject.next(itensLocais);
        this.carrinhoIdSubject.next(null); 
      }
    });
  }
  
  private garantirCarrinhoEcarregarItens(clienteId: number): void {
    this.carrinhoService.buscarPorCliente(clienteId).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          const novoCarrinho: Partial<Carrinho> = { cliente: { id: clienteId } as any };
          return this.carrinhoService.criar(novoCarrinho as Carrinho);
        }
        return throwError(() => new Error('Erro ao buscar ou criar carrinho.'));
      })
    ).subscribe(carrinho => {
      this.carrinhoIdSubject.next(carrinho.id);
      this.itensSubject.next(carrinho.itens || []);
      console.log(`Carrinho ID ${carrinho.id} está ativo para o cliente ${clienteId}.`);
    });
  }

  public adicionarAoCarrinho(produto: Produto, quantidade: number): void {
    // Usamos take(1) para pegar o status de login apenas uma vez e evitar múltiplas execuções
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(logado => {
      if (logado) {
        // --- LÓGICA PARA USUÁRIO LOGADO ---
        this.adicionarItemApi(produto, quantidade);
      } else {
        // --- LÓGICA PARA USUÁRIO ANÔNIMO ---
        this.carrinhoLocalStorage.adicionarItem(produto, quantidade);
        this.itensSubject.next(this.carrinhoLocalStorage.getItens());
        alert(`"${produto.nome}" adicionado ao carrinho local!`);
      }
    });
  }

  // Seu método privado adicionarItemApi() continua aqui...
  private adicionarItemApi(produto: Produto, quantidade: number): void {
    const carrinhoId = this.carrinhoIdSubject.getValue();
    
    if (!carrinhoId) {
      console.error("ID do carrinho não encontrado para usuário logado. A inicialização pode ter falhado.");
      alert("Ocorreu um erro, por favor, recarregue a página.");
      return;
    }

    const novoItem: Partial<CarrinhoItem> = {
      produto: { id: produto.id } as Produto,
      quantidade,
      precoUnitario: produto.preco,
      carrinho: { id: carrinhoId } as Carrinho
    };

    this.carrinhoItemService.criar(novoItem as CarrinhoItem).subscribe(() => {
      const clienteId = this.authService.getClienteId();
      if (clienteId) this.garantirCarrinhoEcarregarItens(clienteId);
      alert(`"${produto.nome}" adicionado ao carrinho no banco de dados!`);
    });
  }

  // Seus métodos de remover e atualizar continuam aqui...
  public removerItem(itemId: number): void {
    if (this.authService.isLoggedIn()) {
       const itensAtuais = this.itensSubject.getValue();
       const novosItens = itensAtuais.filter(item => item.id !== itemId);
       this.itensSubject.next(novosItens);

       this.carrinhoItemService.deletar(itemId).subscribe({
        next: () => {
          console.log(`Item ${itemId} removido do banco de dados.`);
          const clienteId = this.authService.getClienteId();
          if (clienteId) this.garantirCarrinhoEcarregarItens(clienteId);
        },
        error: (err) => {
          console.error("Erro ao remover item da API. Revertendo a alteração.", err);
          this.itensSubject.next(itensAtuais); 
          alert("Não foi possível remover o item. Tente novamente.");
        }
      });
    } else {
      this.carrinhoLocalStorage.removerItem(itemId);
      this.itensSubject.next(this.carrinhoLocalStorage.getItens());
    }
  }

  public atualizarQuantidade(itemId: number, quantidade: number): void {
    if (quantidade < 1) {
      this.removerItem(itemId);
      return;
    }
    if (this.authService.isLoggedIn()) {
      const itemUpdate: Partial<CarrinhoItem> = { quantidade };
      this.carrinhoItemService.atualizar(itemId, itemUpdate as CarrinhoItem).subscribe(() => {
        const clienteId = this.authService.getClienteId();
        if (clienteId) this.garantirCarrinhoEcarregarItens(clienteId);
      });
    } else {
      this.carrinhoLocalStorage.atualizarQuantidade(itemId, quantidade);
      this.itensSubject.next(this.carrinhoLocalStorage.getItens());
    }
  }

  // O método de sincronização também deve estar aqui
  public sincronizarCarrinhoAoLogar(clienteId: number): void {
    const itensLocais = this.carrinhoLocalStorage.getItens();
    if (itensLocais.length === 0) {
      this.garantirCarrinhoEcarregarItens(clienteId);
      return;
    }

    // Garante que o carrinho da API seja criado/buscado antes de tentar adicionar itens
    this.garantirCarrinhoEcarregarItens(clienteId);

    // Adiciona um pequeno delay para garantir que o carrinhoIdSubject foi atualizado
    setTimeout(() => {
        const carrinhoId = this.carrinhoIdSubject.getValue();
        if (!carrinhoId) {
            console.error("Falha ao obter o ID do carrinho para sincronização.");
            return;
        }

        const chamadasDeCriacao = itensLocais.map(itemLocal => {
            const novoItemApi: Partial<CarrinhoItem> = {
                produto: { id: itemLocal.produto.id } as Produto,
                quantidade: itemLocal.quantidade,
                precoUnitario: itemLocal.produto.preco,
                carrinho: { id: carrinhoId } as Carrinho
            };
            return this.carrinhoItemService.criar(novoItemApi as CarrinhoItem);
        });

        forkJoin(chamadasDeCriacao).subscribe({
            next: () => {
                console.log('Carrinho local sincronizado com sucesso!');
                this.carrinhoLocalStorage.limparCarrinho();
                this.garantirCarrinhoEcarregarItens(clienteId);
            },
            error: (err) => console.error("Falha ao sincronizar itens do carrinho:", err)
        });
    }, 500); 
  }
}