import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);

//   CanActivate(): boolean {
//   // Verifica se a variável 'logged' existe no navegador
//   const isLogged = localStorage.getItem('logged') === 'true';

//   if (!isLogged) {
//     return true; // Deixa passar
//   } else {
//     // Se não estiver logado, manda de volta para o login
//     router.navigate(['/login']); 
//     return false;
//   }
// }
// }

// function CanActivate() {
//   throw new Error('Function not implemented.');
// }

@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLogged = localStorage.getItem('logged') === 'true';

    if (!isLogged) {
      this.router.navigate(['login']); // manda pra Login (sua rota '')
      return false;
    }

    return true;
  }
}