import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = {
    email: '',
    password: '',
  };
  constructor(
    private autSercice: AuthService,
    private toolbar: ToolbarComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.autSercice.getUserLogin().subscribe((res) => {
      if (res) {
        this.router.navigate(['/tabs']);
      }
    });
  }

  login() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.autSercice
      .login(email, password)
      .then((res) => {
        console.log('Usuario iniciado: ', res);
        this.navigateToTabs();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ', error);
      });
  }

  loginGoogle() {
    const { email, password } = this.usuario;
    this.autSercice
      .loginWhitGoogle()
      .then((res) => {
        console.log('Usuario iniciado: ', res);
        this.navigateToTabs();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google: ', error);
      });
  }
  logout() {
    this.autSercice.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  navigateToTabs() {
    this.router.navigate(['/tabs']);
  }

  passwordReset(email: string) {
    this.autSercice.resetPassword(email);
  }
}
