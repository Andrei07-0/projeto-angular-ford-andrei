import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variável para exibir erro no HTML
  errorMessage = '';

  // Definição do formulário
  loginForm = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });

  efetuarLogin() {
    // 1. Verifica se o formulário está válido antes de enviar
    if (this.loginForm.invalid) {
      return;
    }

    // 2. Pega os valores do formulário
    const { user, password } = this.loginForm.getRawValue();

    // 3. Chama o serviço
    // O backend (api.js) espera 'nome' e 'senha', então passamos o 'user' como 'nome'
    this.authService.login(user!, password!).subscribe({
      next: (resposta) => {
        console.log('Login realizado com sucesso:', resposta);
        
        // Salva flag de logado e token (se houver)
        localStorage.setItem('logged', 'true');
        
        // Se o seu serviço tiver o método saveToken, descomente abaixo:
        // this.authService.saveToken(resposta.token); 

        // Redireciona para a home
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error(erro);
        this.errorMessage = 'Usuário ou senha incorretos!';
      }
    });
  }
}
  // private fb = inject(FormBuilder);
  // private authService = inject(AuthService);
  // private router = inject(Router);

  // errorMessage = '';

  // loginForm = this.fb.group({
  //   user: ['', Validators.required],
  //   password: ['', Validators.required]
  // });

  // constructor (private loginService: AuthService, private router: Router) { }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { user, password } = this.loginForm.value;
  //     this.authService.login(user!, password!).subscribe({
  //       next: () => this.router.navigate(['/home']),
  //       error: () => this.errorMessage = 'Usuário ou senha incorretos'
  //     });
  // efetuarLogin() {
  //   this.loginService.loginHome(this.email, this.senha).subscribe({
  //     next: (resposta) => {
  //       // Se der certo: salva o token e vai pro dashboard
  //       this.loginService.saveToken(resposta);
  //       localStorage.setItem('logged', 'true');
  //       this.router.navigate(['/home']);
  //     },
  //     error: (erro) => {
  //       // Se der erro: mostra mensagem
  //       this.mensagemErro = 'Usuário ou senha incorretos!';
  //       alert(this.mensagemErro);
  //     },
  //   });
  //   }
  // }

  // email: string = '';
  // senha: string = '';
  // mensagemErro: string = '';

  // constructor(
  //   private router: Router,
  //   private loginService: VehicleService
  // ) {}

  // efetuarLogin() {
  //   this.loginService.loginHome(this.email, this.senha).subscribe({
  //     next: (resposta) => {
  //       // Se der certo: salva o token e vai pro dashboard
  //       this.loginService.saveToken(resposta);
  //       localStorage.setItem('logged', 'true');
  //       this.router.navigate(['/home']);
  //     },
  //     error: (erro) => {
  //       // Se der erro: mostra mensagem
  //       this.mensagemErro = 'Usuário ou senha incorretos!';
  //       alert(this.mensagemErro);
  //     },
  //   });
  // }
// }