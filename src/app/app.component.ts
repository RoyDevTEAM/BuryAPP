import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplashScreen = true; // Inicialmente mostrar el splash screen

  constructor(private router: Router) {} // Inyectar Router en el constructor

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    // Verificar si ya se ha mostrado el splash screen
    const hasSeenSplashScreen = localStorage.getItem('hasSeenSplashScreen');
    
    if (!hasSeenSplashScreen) {
      setTimeout(() => {
        // Aplicar clase de transición para ocultar el splash screen
        const splashElement = document.querySelector('app-splash-screen');
        if (splashElement) {
          splashElement.classList.add('hidden'); // Asegúrate de tener esta clase en tu CSS
        }
        
        // Después de la transición, quitar el splash screen y redirigir a /login
        setTimeout(() => {
          this.showSplashScreen = false;
          localStorage.setItem('hasSeenSplashScreen', 'true'); // Marcar que se ha visto el splash screen
          
          // Redirigir a /login
          this.router.navigate(['/login']);
        }, 1000); // Esperar a que la transición termine (1s)
      }, 3000); // Mostrar el splash screen por 3 segundos
    } else {
      // Si ya se ha visto el splash screen, redirigir inmediatamente a /login
      this.showSplashScreen = false;
    }
  }
}
