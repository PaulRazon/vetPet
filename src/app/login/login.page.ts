import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


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
    private autService: AuthService,
    private toolbar: ToolbarComponent,
    private router: Router,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.autService.getUserLogin().subscribe((res) => {
      if (res) {
        this.router.navigate(['/tabs']);
      }
    });
  }

  // LoginPage

// ...

async login() {
  const { email, password } = this.usuario;
  try {
    await this.autService.login(email, password);
    console.log('Usuario iniciado correctamente');
    this.navigateToTabs();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    this.presentToast('Correo o contraseña inválidos');
  }
}
  
  loginGoogle() {
    const { email, password } = this.usuario;
    this.autService
      .loginWhitGoogle()
      .then((res) => {
        //console.log('Usuario iniciado: ', res);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google: ', error);
      });
  }
  logout() {
    this.autService.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  navigateToTabs() {
    this.autService.isUserAuthenticated()
      .then(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/tabs']);
        } else {
          console.error('Error: Usuario no autenticado después del inicio de sesión');
          this.presentToast('Correo o contraseña inválidos');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToTab() {
    this.router.navigate(['/tabs/tab1']);
  }
  passwordReset(email: string) {
    this.autService.resetPassword(email);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'top', 
      color: 'danger', 
    });
    toast.present();
  }
}
