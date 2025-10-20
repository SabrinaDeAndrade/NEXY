import { Component, OnInit } from '@angular/core';
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
export class ProdutoForm implements OnInit {

  produtoForm!: FormGroup;
  categorias: Categoria[] = [];

  imagensSelecionadas: File[] = [];
  previewUrls: string[] = [];
  imagensExistentes: ImagemProduto[] = [];

  modoEdicao = false;
  produtoId: number | null = null;
  uploadProgresso = 0;

  mostrarModalCategoria = false;
  novaCategoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
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
  }

  ngOnInit(): void {
    this.carregarCategorias();
    this.verificarModoEdicao();
  }

  verificarModoEdicao(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.produtoId = Number(idParam);
      this.carregarDadosProduto(this.produtoId);
    }
  }

  carregarDadosProduto(id: number): void {
    this.produtoService.buscarPorId(id).subscribe(produto => {
      this.produtoForm.patchValue({
        nome: produto.nome,
        descricao: produto.descricao,
        estoque: produto.estoque,
        preco: produto.preco,
        peso: produto.peso,
        altura: produto.altura,
        largura: produto.largura,
        categoriaId: produto.categoria.id
      });
      this.imagensExistentes = produto.imagens || [];
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

    // Adiciona os novos arquivos à lista existente
    this.imagensSelecionadas.push(...novosArquivos);

    // Gera pré-visualizações para os novos arquivos
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
    if (!this.produtoForm.valid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
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

    if (this.modoEdicao && this.produtoId) {
  
      dadosProduto.id = this.produtoId;

      this.produtoService.atualizar(this.produtoId, dadosProduto as Produto).subscribe({
        next: (produtoAtualizado) => {
          console.log('Produto atualizado com sucesso!', produtoAtualizado);
          this.uploadDeImagens(produtoAtualizado.id, 'Produto atualizado');
        },
        error: (erro) => console.error('Erro ao atualizar produto:', erro)
      });
    } else {
   
      this.produtoService.criar(dadosProduto as Produto).subscribe({
        next: (produtoSalvo) => {
          console.log('Produto cadastrado com sucesso!', produtoSalvo);
          this.uploadDeImagens(produtoSalvo.id, 'Produto cadastrado');
        },
        error: (erro) => console.error('Erro ao cadastrar produto:', erro)
      });
    }
  }

  uploadDeImagens(produtoId: number, mensagemBase: string): void {
    if (this.imagensSelecionadas.length > 0) {
      this.produtoService.uploadImagens(produtoId, this.imagensSelecionadas).subscribe({
        next: (evento) => {
          if (evento.type === HttpEventType.UploadProgress && evento.total) {
            this.uploadProgresso = Math.round(100 * (evento.loaded / evento.total));
          } else if (evento.type === HttpEventType.Response) {
            this.resetarFormulario(mensagemBase + ' e imagens enviadas com sucesso!');
          }
        },
        error: (erro) => {
          console.error('Erro ao enviar imagens:', erro);
          alert(mensagemBase + ', mas houve erro no envio das imagens.');
        }
      });
    } else {
      this.resetarFormulario(mensagemBase + ' com sucesso!');
    }
  }

  resetarFormulario(mensagem: string): void {
    alert(mensagem);
    this.router.navigate(['/admin/produtos']);
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
