import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lista-gerenciamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-gerenciamento.html',
  styleUrl: './lista-gerenciamento.css'
})
export class ListaGerenciamento {

  @Output() viewSelected = new EventEmitter<string>();

  activeView: string = 'produtos';

  selectView(viewName: string): void {
    this.activeView = viewName;
    this.viewSelected.emit(viewName)
  }
}
