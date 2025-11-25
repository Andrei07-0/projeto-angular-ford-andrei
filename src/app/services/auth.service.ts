
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../app/models/type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3001';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  login(nome: string, senha: string) {
    return this.http.post<User>(`${this.apiUrl}/login`, { nome, senha }).pipe(
      tap(() => {
        this.loggedIn.next(true);
        localStorage.setItem('ford_token', 'true');
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('ford_token');
    this.router.navigate(['/login']);
  }
}