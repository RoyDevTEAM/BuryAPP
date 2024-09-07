import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  isConnected: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkConnection();
  }

  async checkConnection() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;
    
    if (this.isConnected) {
      // Redirigir a HomePage si la conexión es restablecida
      this.router.navigate(['/home']);
    } else {
      // Realizar acciones si no hay conexión
      console.log('No hay conexión a Internet.');
    }
  }

  retryConnection() {
    this.checkConnection();
  }
}
