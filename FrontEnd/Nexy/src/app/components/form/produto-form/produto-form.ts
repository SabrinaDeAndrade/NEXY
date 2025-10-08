import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../../services/produto';
import { Categorias } from '../../../services/categorias';
import { Categoria } from '../../../interfaces/Categorias';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit {
  
  produtoForm!: FormGroup;
  categorias: Categoria[] = [];

  constructor(
   private fb: FormBuilder, 
    private produtoService: Produto,
    private categoriaService: Categorias
  ) {}

  ngOnInit(): void {
    
    this.produtoForm = this.fb.group({
      // O 'id' e a 'imagemUrl' serão tratados separadamente ou pelo backend
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

 onSubmit(): void {
    if (this.produtoForm.valid) {

      const formValue = this.produtoForm.value;

      // Transformar categoriaId em objeto Categoria
      const novoProduto: Produto = {
        ...formValue,
        categoria: { id: formValue.categoriaId }
      };

      delete (novoProduto as any).categoriaId;

      this.produtoService.criar(novoProduto).subscribe({
        next: (produtoSalvo) => {
          console.log('Produto cadastrado com sucesso!', produtoSalvo);
          this.produtoForm.reset();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar produto:', erro);
        }
      });

    } else {
      alert('Preencha todos os campos obrigatórios corretamente.');
    }
  }
}