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

  // Adicione um formulário para o cartão também
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
    // Formulário de Endereço
    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required], 
      estado: ['', Validators.required]
    });

    // Formulário de Cartão
    this.cartaoForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      dataVenc: ['', Validators.required],
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
      console.error("Ocorreu um erro: o objeto de endereço ou seu ID é inválido.", endereco);
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

  finalizarCompra(): void {
    const clienteId = this.authService.getClienteId();
    if (!clienteId || !this.enderecoSelecionadoId) {
      alert("Erro: Cliente ou endereço não selecionado.");
      return;
    }

    // --- LÓGICA DO MERCADO PAGO ENTRARIA AQUI ---
    // 1. Se for um novo cartão, você usaria a SDK do Mercado Pago para criar um 'card_token'.
    //    const cardToken = await mercadoPago.sdk.getCardToken(this.cartaoForm.value);
    // 2. Se for um cartão salvo, você usaria o ID do cartão para criar um 'payment_token'.
    
    const payload = {
      clienteId: clienteId,
      enderecoId: this.enderecoSelecionadoId,
      cartaoToken: "TOKEN_GERADO_PELO_MERCADO_PAGO" // Este token é o que vai para o seu backend
    };

    this.checkoutService.finalizarPedido(payload).subscribe(pedido => {
      console.log("Pedido finalizado com sucesso!", pedido);
      alert(`Pedido #${pedido.id} realizado com sucesso!`);
      this.carrinhoStateService.limparCarrinho();
      this.router.navigate(['/pedido-sucesso', pedido.id]); 
    });
  }

  salvarNovoCartao(): void {
    if (this.cartaoForm.invalid) {
      alert("Por favor, preencha todos os dados do cartão corretamente.");
      return;
    }

    const clienteId = this.authService.getClienteId();
    if (clienteId) {
      // Chama o serviço de checkout para salvar o novo cartão na API
      this.checkoutService.salvarCartao(clienteId, this.cartaoForm.value).subscribe({
        next: (cartaoSalvo) => {
          console.log('Cartão salvo com sucesso!', cartaoSalvo);
          
          // Adiciona o novo cartão à lista para exibição imediata
          this.cartoesSalvos.push(cartaoSalvo);
          
          // Seleciona automaticamente o cartão recém-cadastrado
          this.cartaoSelecionadoId = cartaoSalvo.id;
          
          // Esconde o formulário de cadastro
          this.mostrarFormularioCartao = false;
          
          // Limpa o formulário para a próxima vez
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