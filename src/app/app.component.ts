import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplashScreen = true; // Inicialmente mostrar el splash screen

  constructor() {}

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    // Verificar si ya se ha mostrado el splash screen
    const hasSeenSplashScreen = localStorage.getItem('hasSeenSplashScreen');
    
    if (!hasSeenSplashScreen) {
      // Mostrar el splash screen si es la primera vez
      setTimeout(() => {
        // Aplicar clase de transición para ocultar el splash screen
        const splashElement = document.querySelector('app-splash-screen');
        if (splashElement) {
          splashElement.classList.add('hidden');
        }
        
        // Después de la transición, quitar el splash screen
        setTimeout(() => {
          this.showSplashScreen = false;
          // Marcar que se ha visto el splash screen
          localStorage.setItem('hasSeenSplashScreen', 'true');
        }, 500); // Esperar a que la transición termine (0.5s)
      }, 3000); // Mostrar el splash screen por 3 segundos
    } else {
      // Si ya se ha visto el splash screen, no mostrarlo
      this.showSplashScreen = false;
    }
  }
}
