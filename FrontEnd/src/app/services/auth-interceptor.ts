import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

// Esta é a nova sintaxe para um Interceptor Funcional
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Injetamos o AuthService aqui, em vez de no construtor
  const authService = inject(AuthService);
  
  // 2. Pegamos o token
  const token = authService.getToken();

  // 3. Se o token existir, clonamos a requisição para adicionar o cabeçalho
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    // 4. Passamos a requisição clonada (com token) para o próximo passo
    return next(clonedReq);
  }

  // 5. Se não houver token, passamos a requisição original
  return next(req);
};
