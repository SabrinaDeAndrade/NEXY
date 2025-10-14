import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../interfaces/Categorias';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../../services/produtoService';
import { CategoriaService } from '../../../services/categoriaService';
import { Produto } from '../../../interfaces/Produto';
import { HttpEventType } from '@angular/common/http';



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
  imagemSelecionada: File | null = null;
  uploadProgresso = 0;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {

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
    this.carregarCategorias();
  }
  carregarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar categorias:', erro);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imagemSelecionada = file;
    }
  }

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const formValue = this.produtoForm.value;

        const novoProduto: Partial<Produto> = {
        nome: formValue.nome,
        descricao: formValue.descricao,
        estoque: formValue.estoque,
        preco: formValue.preco,
        peso: formValue.peso,
        altura: formValue.altura,
        largura: formValue.largura,
        categoria: { id: formValue.categoriaId, nome: '' },
        imagemUrl: ''
      };

      
      // 1️⃣ Salva o produto
      this.produtoService.criar(novoProduto as Produto).subscribe({
        next: (produtoSalvo) => {
          console.log('Produto cadastrado com sucesso!', produtoSalvo);

          // 2️⃣ Faz o upload da imagem (se tiver)
          if (this.imagemSelecionada) {
            this.produtoService.uploadImagem(produtoSalvo.id, this.imagemSelecionada).subscribe({
              next: (evento) => {
                if (evento.type === HttpEventType.UploadProgress && evento.total) {
                  this.uploadProgresso = Math.round(100 * (evento.loaded / evento.total));
                } else if (evento.type === HttpEventType.Response) {
                  console.log('Imagem enviada com sucesso!', evento.body);
                  alert('Produto e imagem cadastrados com sucesso!');
                  this.produtoForm.reset();
                  this.uploadProgresso = 0;
                }
              },
              error: (erro) => {
                console.error('Erro ao enviar imagem:', erro);
                alert('Produto cadastrado, mas houve erro no envio da imagem.');
              }
            });
          } else {
            alert('Produto cadastrado com sucesso!');
            this.produtoForm.reset();
          }
        },
        error: (erro) => {
          console.error('Erro ao cadastrar produto:', erro);
          alert('Erro ao cadastrar produto. Verifique os dados.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  }
}
      
      

    //   this.produtoService.criar(novoProduto as Produto).subscribe({
    //     next: (produtoSalvo) => {
    //       console.log('Produto cadastrado com sucesso!', produtoSalvo);
    //       this.produtoForm.reset();
    //     },
    //     error: (erro) => {
    //       console.error('Erro ao cadastrar produto:', erro);
    //     }
    //   });

    // } else {
    //   alert('Preencha todos os campos obrigatórios corretamente.');
    // }
//   }
// }