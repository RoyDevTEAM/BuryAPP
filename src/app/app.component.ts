import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplashScreen = true; // Inicialmente mostrar el splash screen

  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    setTimeout(() => {
      // Aplicar clase de transición para ocultar el splash screen
      const splashElement = document.querySelector('app-splash-screen');
      if (splashElement) {
        splashElement.classList.add('hidden');
      }
  
      // Después de la transición, quitar el splash screen
      setTimeout(() => {
        this.showSplashScreen = false;

      }, 500); // Esperar a que la transición termine (0.5s)
    }, 3000); // Mostrar el splash screen por 3 segundos
  }
  
}
