import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Favorito } from 'src/app/models/favorito.model'; // Asegúrate de importar el modelo Favorito

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos: Favorito[] = []; // Guarda todos los favoritos, no solo los bares

  constructor(
    private favoritosService: FavoritosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.favoritosService.getFavoritos().subscribe((favoritos) => {
      this.favoritos = favoritos; // Guarda la lista completa de favoritos
    });
  }

  async confirmEliminarFavorito(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este bar de tus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'text-gray-500',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarFavorito(id);
          },
          cssClass: 'text-red-500',
        },
      ],
    });

    await alert.present();
  }

  eliminarFavorito(id: number) {
    this.favoritosService.deleteFavorito(id).subscribe(() => {
      this.favoritos = this.favoritos.filter((favorito) => favorito.id !== id); // Asegúrate de usar `favorito.id`
    });
  }
}
