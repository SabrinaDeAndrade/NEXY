import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cards } from '../../cards-produto/cards';
import { Produto } from '../../../interfaces/Produto';

@Component({
  selector: 'app-lista-produtos',
   standalone: true,
  imports: [CommonModule, Cards],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css'
})
export class ListaProdutos {

@Input() produtos: Produto[] = [];

}
