import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Sobre } from './pages/sobre/sobre';
import { Carrinho } from './pages/carrinho/carrinho';
import { ProdutoForm } from './components/form/produto-form/produto-form';
import { BuscaCategorias } from './pages/busca-categorias/busca-categorias';
import { Registro } from './pages/registro/registro';
import { ProdutoDetalhes } from './pages/produto-detalhes/produto-detalhes';
import { Checkout } from './pages/checkout/checkout';
import { PedidoSucesso } from './pages/pedido-sucesso/pedido-sucesso';
import { MeusPedidos } from './pages/meus-pedidos/meus-pedidos';
import { PedidoDetalhes } from './pages/pedido-detalhes/pedido-detalhes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'sobre', component: Sobre },
  { path: 'categorias', component: BuscaCategorias },
  { path: 'carrinho', component: Carrinho },
  { path: 'cadastroProduto', component: ProdutoForm },
  { path: 'produto/:id', component: ProdutoDetalhes },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login},
  { path: 'checkout', component: Checkout },
  { path: 'pedido-sucesso/:id', component: PedidoSucesso },
  { path: 'meus-pedidos', component: MeusPedidos},
  { path: 'pedido-detalhes/:id',component: PedidoDetalhes,},
  { path: '**', redirectTo: 'home' }
];