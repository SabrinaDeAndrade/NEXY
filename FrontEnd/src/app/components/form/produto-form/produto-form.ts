import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../interfaces/Categorias';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../services/produtoService';
import { CategoriaService } from '../../../services/categoriaService';
import { Produto } from '../../../interfaces/Produto';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemProduto } from '../../../interfaces/ImagemProduto';



@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit, OnChanges {

  @Input() productId: number | null = null;
  @Output() formClosed = new EventEmitter<void>();

  produtoForm!: FormGroup;
  categorias: Categoria[] = [];
  imagensSelecionadas: File[] = [];
  previewUrls: string[] = [];
  imagensExistentes: ImagemProduto[] = [];
  modoEdicao = false;
  uploadProgresso = 0;
  mostrarModalCategoria = false;
  novaCategoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {

    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      estoque: [0, [Validators.required, Validators.min(0)]],
      preco: [0.01, [Validators.required, Validators.min(0.01)]],
      peso: [0, [Validators.required, Validators.min(0)]],
      altura: [0, [Validators.required, Validators.min(0)]],
      largura: [0, [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required]
    });
    this.novaCategoriaForm = this.fb.group({
      nome: ['', Validators.required]
    });
    console.log('ProdutoForm Constructor - productId inicial:', this.productId);
  }

  ngOnInit(): void {
    console.log('ProdutoForm OnInit - productId:', this.productId);
    this.carregarCategorias();
    this.verificarModoEdicao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ProdutoForm ngOnChanges DETETADO:', changes);
    if (changes['productId']) {
      const novoProductId = changes['productId'].currentValue;
      const productIdAnterior = changes['productId'].previousValue;
      console.log(`ProdutoForm ngOnChanges - productId mudou de ${productIdAnterior} para ${novoProductId}`);
      this.productId = novoProductId;
      this.verificarModoEdicao();
    }
  }

  verificarModoEdicao(): void {
    console.log('ProdutoForm: verificarModoEdicao CHAMADO com productId:', this.productId);
    if (this.productId !== null && this.productId > 0) {
      if (!this.modoEdicao) {
        console.log('ProdutoForm: ENTRANDO em Modo Edição para ID:', this.productId);
        this.modoEdicao = true;
        this.carregarDadosProduto(this.productId);
      } else {
        console.log('ProdutoForm: JÁ estava em Modo Edição para ID:', this.productId, '. A recarregar dados.');
        this.carregarDadosProduto(this.productId);
      }
    } else {

      if (this.modoEdicao || this.produtoForm.dirty) {
        console.log('ProdutoForm: ENTRANDO/Resetando para Modo Criação.');
        this.modoEdicao = false;
        this.produtoForm.reset({
          estoque: 0, preco: 0.01, peso: 0, altura: 0, largura: 0, categoriaId: ''
        });
        this.imagensExistentes = [];
        this.imagensSelecionadas = [];
        this.previewUrls = [];
        this.uploadProgresso = 0;
      } else {
        console.log('ProdutoForm: JÁ estava em Modo Criação. Nenhuma ação de reset necessária.');
      }
    }
    console.log('ProdutoForm: verificarModoEdicao FINALIZADO. modoEdicao =', this.modoEdicao);
  }


  carregarDadosProduto(id: number): void {
    console.log('ProdutoForm: Carregando dados para produto ID:', id);
    this.imagensSelecionadas = [];
    this.previewUrls = [];
    this.uploadProgresso = 0;

    this.produtoService.buscarPorId(id).subscribe({
      next: (produto) => {
        console.log('ProdutoForm: Dados recebidos da API ->', produto);
        this.produtoForm.patchValue({
          nome: produto.nome,
          descricao: produto.descricao,
          estoque: produto.estoque,
          preco: produto.preco,
          peso: produto.peso,
          altura: produto.altura,
          largura: produto.largura,
          categoriaId: produto.categoria?.id
        });
        this.imagensExistentes = produto.imagens || [];
        console.log('ProdutoForm: Formulário preenchido e imagens existentes definidas.');
      },
      error: (err) => {
        console.error('ProdutoForm: Erro ao carregar dados do produto:', err);
        alert('Erro ao carregar os dados do produto para edição.');
        this.cancel();
      }
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (dados) => { this.categorias = dados; },
      error: (erro) => { console.error('Erro ao carregar categorias:', erro); }
    });
  }


  onFileSelected(event: any): void {
    const novosArquivos: File[] = Array.from(event.target.files);


    this.imagensSelecionadas.push(...novosArquivos);


    novosArquivos.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removerImagemExistente(imagemId: number): void {
    if (confirm('Deseja realmente excluir esta imagem?')) {
      this.produtoService.deletarImagem(imagemId).subscribe({
        next: () => {
          this.imagensExistentes = this.imagensExistentes.filter(img => img.id !== imagemId);
          alert('Imagem removida com sucesso!');
        },
        error: (erro) => {
          console.error('Erro ao remover imagem:', erro);
          alert('Não foi possível remover a imagem.');
        }
      });
    }
  }
  removerImagemPreview(index: number): void {
    this.imagensSelecionadas.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }



  onSubmit(): void {
    console.log('ProdutoForm: onSubmit INICIADO. modoEdicao:', this.modoEdicao, 'productId:', this.productId); // Log onSubmit
    if (!this.produtoForm.valid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      console.warn('ProdutoForm: Tentativa de submit com formulário inválido:', this.produtoForm.value); // Log form inválido

      this.produtoForm.markAllAsTouched();
      return;
    }

    const formValue = this.produtoForm.value;
    const dadosProduto: Partial<Produto> = {
      nome: formValue.nome,
      descricao: formValue.descricao,
      estoque: formValue.estoque,
      preco: formValue.preco,
      peso: formValue.peso,
      altura: formValue.altura,
      largura: formValue.largura,
      categoria: { id: formValue.categoriaId } as Categoria,
    };

    if (this.modoEdicao && this.productId) {
      dadosProduto.id = this.productId;
      console.log('ProdutoForm: Enviando ATUALIZAÇÃO para API:', dadosProduto);
      this.produtoService.atualizar(this.productId, dadosProduto as Produto).subscribe({
        next: (produtoAtualizado) => {
          console.log('ProdutoForm: ATUALIZAÇÃO bem-sucedida!', produtoAtualizado);
          this.uploadDeImagens(produtoAtualizado.id, 'Produto atualizado');
        },
        error: (erro) => console.error('ProdutoForm: Erro ao ATUALIZAR produto:', erro)
      });
    } else {
      console.log('ProdutoForm: Enviando CRIAÇÃO para API:', dadosProduto);
      this.produtoService.criar(dadosProduto as Produto).subscribe({
        next: (produtoSalvo) => {
          console.log('ProdutoForm: CRIAÇÃO bem-sucedida!', produtoSalvo);
          this.uploadDeImagens(produtoSalvo.id, 'Produto cadastrado');
        },
        error: (erro) => console.error('ProdutoForm: Erro ao CADASTRAR produto:', erro)
      });
    }
  }

  uploadDeImagens(produtoId: number, mensagemBase: string): void {
    console.log('ProdutoForm: uploadDeImagens INICIADO para produto ID:', produtoId, 'com', this.imagensSelecionadas.length, 'imagens.');
    if (this.imagensSelecionadas.length > 0) {
      this.produtoService.uploadImagens(produtoId, this.imagensSelecionadas).subscribe({
      });
    } else {
      console.log('ProdutoForm: Nenhuma imagem nova para upload.');
      this.onSaveSuccess(mensagemBase + ' com sucesso!');
    }
  }

  onSaveSuccess(mensagem: string): void {
    console.log('ProdutoForm: onSaveSuccess - Emitindo formClosed.');
    alert(mensagem);
    this.formClosed.emit();
  }

  cancel(): void {
    console.log("ProdutoForm: Cancelado - Emitindo formClosed.");
    this.formClosed.emit();
  }


  abrirModalCategoria(): void {
    this.mostrarModalCategoria = true;
  }

  fecharModalCategoria(): void {
    this.mostrarModalCategoria = false;
    this.novaCategoriaForm.reset();
  }

  salvarNovaCategoria(): void {
    if (this.novaCategoriaForm.invalid) return;

    const novaCategoria: Partial<Categoria> = {
      nome: this.novaCategoriaForm.value.nome
    };

    this.categoriaService.criar(novaCategoria as Categoria).subscribe({
      next: (categoriaSalva) => {
        alert('Nova categoria cadastrada!');
        this.carregarCategorias();
        this.produtoForm.patchValue({ categoriaId: categoriaSalva.id });
        this.fecharModalCategoria();
      },
      error: (err) => {
        console.error("Erro ao salvar categoria:", err);
        alert("Não foi possível salvar a nova categoria.");
      }
    });
  }
}
