import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interfaces/Categorias';
import { CategoriaService } from '../../services/categoriaService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-categorias.html',
  styleUrl: './gerenciar-categorias.css'
})
export class GerenciarCategorias implements OnInit {

  public categorias: Categoria[] = [];
  public categoriaEmEdicao: Categoria | null = null;
  public nomeCategoriaInput = '';
  public carregando = true;

  public mostrarModal = false;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  public carregarCategorias(): void {
    this.carregando = true;
    this.categoriaService.listarTodas().subscribe(dados => {
      this.categorias = dados;
      this.carregando = false;
    });
  }

  public iniciarCadastro(): void {
    this.resetarFormulario();
    this.mostrarModal = true;
  }

  public iniciarEdicao(categoria: Categoria): void {
    this.categoriaEmEdicao = { ...categoria };
    this.nomeCategoriaInput = categoria.nome;
    this.mostrarModal = true;
  }

  public fecharModal(): void {
    this.mostrarModal = false;
    this.resetarFormulario();
  }

  public salvarCategoria(): void {
    if (!this.nomeCategoriaInput.trim()) {
      alert('O nome da categoria não pode estar vazio.');
      return;
    }

    if (this.categoriaEmEdicao) {
      const categoriaAtualizada: Categoria = {
        id: this.categoriaEmEdicao.id,
        nome: this.nomeCategoriaInput
      };

      this.categoriaService.atualizar(this.categoriaEmEdicao.id, categoriaAtualizada).subscribe(() => {
        this.resetarFormulario();
        this.carregarCategorias();
        this.fecharModal();
      });

    } else {
      const novaCategoria: Partial<Categoria> = {
        nome: this.nomeCategoriaInput
      };

      this.categoriaService.criar(novaCategoria).subscribe(() => {
        this.resetarFormulario();
        this.carregarCategorias();
        this.fecharModal();
      });
    }
  }


  public resetarFormulario(): void {
    this.categoriaEmEdicao = null;
    this.nomeCategoriaInput = '';
  }

  public removerCategoria(id: number): void {
    if (confirm('Tem certeza que deseja remover esta categoria? Esta ação não pode ser desfeita.')) {
      this.categoriaService.deletar(id).subscribe({
        next: () => {
      
          if (this.categoriaEmEdicao && this.categoriaEmEdicao.id === id) {
            this.resetarFormulario();
          }
          this.carregarCategorias(); 
        },
        error: (err) => {
          alert('Erro ao remover categoria. Verifique se ela não está sendo usada por um produto.');
          console.error(err);
        }
      });
    }
  }
}


