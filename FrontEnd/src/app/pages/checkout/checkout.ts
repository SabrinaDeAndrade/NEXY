import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '../../interfaces/Endereco';
import { ClienteCartao } from '../../interfaces/ClienteCartao';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from '../../services/checkout-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CarrinhoStateService } from '../../services/carrinho-state-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  etapa: 'endereco' | 'pagamento' | 'carregando' = 'carregando';

  enderecosSalvos: Endereco[] = [];
  enderecoSelecionadoId: number | null = null;

  cartoesSalvos: ClienteCartao[] = [];
  cartaoSelecionadoId: number | null = null;

  enderecoForm: FormGroup;
  mostrarFormularioEndereco = false;

  cartaoForm: FormGroup;
  mostrarFormularioCartao = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private carrinhoStateService: CarrinhoStateService,
    private router: Router
  ) {

    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });


    this.cartaoForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      mesVenc: ['', Validators.required],
      anoVenc: ['', Validators.required],
      cvv: ['', Validators.required],
      cpfTitular: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarEnderecos();
  }

  carregarEnderecos(): void {
    const clienteId = this.authService.getClienteId();
    if (clienteId) {
      this.checkoutService.getEnderecos(clienteId).subscribe(enderecos => {
        this.enderecosSalvos = enderecos;
        this.etapa = 'endereco';

        if (enderecos.length === 0) {
          this.mostrarFormularioEndereco = true;
        }
      });
    } else {
      alert("Você precisa estar logado para finalizar a compra.");
      this.router.navigate(['/login']);
    }
  }

  buscarCep(): void {
    const cep = this.enderecoForm.get('cep')?.value.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((dados: any) => {
        if (!dados.erro) {
          this.enderecoForm.patchValue({
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          });
        }
      });
    }
  }

  salvarNovoEndereco(): void {
    if (this.enderecoForm.invalid) return;
    const clienteId = this.authService.getClienteId();
    if (clienteId) {
      this.checkoutService.salvarEndereco(clienteId, this.enderecoForm.value).subscribe(enderecoSalvo => {
        this.enderecosSalvos.push(enderecoSalvo);
        this.enderecoSelecionadoId = enderecoSalvo.id;
        this.mostrarFormularioEndereco = false;
      });
    }
  }

 selecionarEndereco(endereco: Endereco): void {
  console.log('Endereço selecionado:', endereco);
  if (endereco && endereco.id) {
    this.enderecoSelecionadoId = endereco.id;
    console.log('ID do endereço foi definido para:', this.enderecoSelecionadoId);
  } else {
    console.error('Ocorreu um erro: o objeto de endereço ou seu ID é inválido.', endereco);
  }
}

  prosseguirParaPagamento(): void {
    if (!this.enderecoSelecionadoId) {
      alert("Por favor, selecione ou cadastre um endereço de entrega.");
      return;
    }
    this.etapa = 'carregando';
    const clienteId = this.authService.getClienteId();
    if (clienteId) {
      this.checkoutService.getCartoes(clienteId).subscribe(cartoes => {
        this.cartoesSalvos = cartoes;
        this.etapa = 'pagamento';
        if (cartoes.length === 0) {
          this.mostrarFormularioCartao = true;
        }
      });
    }
  }

selecionarCartao(cartao: ClienteCartao): void {
  console.log('Cartão selecionado:', cartao);
  if (cartao && cartao.id) {
    this.cartaoSelecionadoId = cartao.id;
    console.log('ID do cartão foi definido para:', this.cartaoSelecionadoId);
  } else {
    console.error('Ocorreu um erro: o objeto de cartão ou seu ID é inválido.', cartao);
  }
}

  finalizarCompra(): void {
    const clienteId = this.authService.getClienteId();
    if (!clienteId || !this.enderecoSelecionadoId) {
      alert("Erro: Cliente ou endereço não selecionado.");
      return;
    }

    if (!this.cartaoSelecionadoId) {
      alert("Por favor, selecione ou cadastre um cartão de crédito.");
      return;
    }

    const payload = {
      clienteId: clienteId,
      enderecoId: this.enderecoSelecionadoId,
      cartaoId: this.cartaoSelecionadoId 
    };

     this.etapa = 'carregando';  // CORREÇÃO: Mostra carregamento durante a finalização
    this.checkoutService.finalizarPedido(payload).subscribe({
      next: (pedido) => {
        console.log("Pedido finalizado com sucesso!", pedido);
        alert(`Pedido #${pedido.id} realizado com sucesso!`);
        this.carrinhoStateService.limparCarrinho();
        this.router.navigate(['/pedido-sucesso', pedido.id]);
      },
      error: (err) => {
        console.error("Erro ao finalizar pedido:", err);
        alert("Erro ao processar o pagamento. Verifique os dados e tente novamente.");
        this.etapa = 'pagamento';  // CORREÇÃO: Volta para pagamento em caso de erro
      }
    });
  }

  salvarNovoCartao(): void {
    if (this.cartaoForm.invalid) {
      alert("Por favor, preencha todos os dados do cartão corretamente.");
      return;
    }

    const clienteId = this.authService.getClienteId();
    if (clienteId) {

      this.checkoutService.salvarCartao(clienteId, this.cartaoForm.value).subscribe({
        next: (cartaoSalvo) => {
          console.log('Cartão salvo com sucesso!', cartaoSalvo);

          this.cartoesSalvos.push(cartaoSalvo);

          this.cartaoSelecionadoId = cartaoSalvo.id;

          this.mostrarFormularioCartao = false;

          this.cartaoForm.reset();

          alert("Cartão cadastrado com sucesso!");
        },
        error: (err) => {
          console.error("Erro ao salvar o cartão:", err);
          alert("Não foi possível salvar o cartão. Tente novamente.");
        }
      });
    }
  }
}