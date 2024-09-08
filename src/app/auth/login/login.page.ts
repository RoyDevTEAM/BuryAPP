import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  toastMessage: string = '';
  showSplashScreen = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  async login() {
    if (!this.email || !this.password) {
      this.toastMessage = 'Por favor, completa todos los campos.';
      await this.presentToast();
      return;
    }

    try {
      const response = await firstValueFrom(this.authService.login(this.email, this.password));
      localStorage.setItem('auth_token', response.access_token);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      this.toastMessage = 'Credenciales incorrectas o error de conexión.';
      await this.presentToast();
    }
  }

  initializeApp() {
    setTimeout(() => {
      const splashElement = document.querySelector('app-splash-screen');
      if (splashElement) {
        splashElement.classList.add('hidden');
      }

      setTimeout(() => {
        this.showSplashScreen = false;
      }, 500);
    }, 3000);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}
