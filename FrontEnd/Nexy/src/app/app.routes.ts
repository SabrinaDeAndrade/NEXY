import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Sobre } from './pages/sobre/sobre';
import { Categorias } from './pages/categorias/categorias';
import { Carrinho } from './pages/carrinho/carrinho';
import { ProdutoForm } from './components/form/produto-form/produto-form';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'sobre', component: Sobre },
  { path: 'categorias', component: Categorias },
  { path: 'carrinho', component: Carrinho },
  {path: 'cadatroProduto',component: ProdutoForm},
  { path: '**', redirectTo: 'home' } 
];

