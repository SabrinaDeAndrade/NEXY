import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export class Cards{

@Input() produto!: Produto;



}