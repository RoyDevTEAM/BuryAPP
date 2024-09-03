// src/app/shared/nav-bar/nav-bar.page.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
})
export class NavBarPage implements OnInit {
  usuario: Usuario | null = null; // Almacena la información del usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.cargarInformacionUsuario();
  }

  cargarInformacionUsuario() {
    this.authService.getUserInfo().subscribe(
      (data: Usuario) => {
        this.usuario = data; // Asigna la información del usuario
      },
      error => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }
  cerrarSesion() {
    this.authService.logout().subscribe(
      () => {
        this.usuario = null; // Limpia la información del usuario
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      },
      error => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
