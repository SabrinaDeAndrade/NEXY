import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { CarrinhoStateService } from '../../services/carrinho-state-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
   isLoggedIn$: Observable<boolean>;
  quantidadeItensCarrinho = 0;
  isNavbarVisible = true;
  private lastScrollTop = 0;

  constructor(
    public authService: AuthService,
    private carrinhoStateService: CarrinhoStateService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;

      if (scrollTop > this.lastScrollTop && scrollTop > 80) {
        this.isNavbarVisible = false;
      } else {
        this.isNavbarVisible = true;
      }

      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    this.carrinhoStateService.itens$.subscribe(itens => {
      this.quantidadeItensCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
