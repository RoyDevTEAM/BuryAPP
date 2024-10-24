import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  usuario: Usuario = new Usuario(0, '', '', ''); // Inicializa todas las propiedades del usuario

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    );
  }

  async confirmEliminarCuenta() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'text-gray-500',
        },
        {
          text: 'Eliminar',
          cssClass: 'text-red-500',
          handler: () => {
            this.eliminarCuenta();
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarCuenta() {
    this.authService.deleteAccount().subscribe(
      () => {
        this.authService.logout(); // Cierra la sesión después de eliminar la cuenta
        this.router.navigate(['/login']); // Redirige al login
      },
      (error) => {
        console.error('Error al eliminar la cuenta', error);
      }
    );
  }
}
