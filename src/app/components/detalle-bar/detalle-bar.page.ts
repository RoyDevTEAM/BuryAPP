import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Bar } from 'src/app/models/bar.model';
import { Imagen } from 'src/app/models/imagen.model';
import { Video } from 'src/app/models/video.model';
import { BaresService } from 'src/app/services/bares.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { VideosService } from 'src/app/services/videos.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { ToastController } from '@ionic/angular'; 
import { Network } from '@capacitor/network'; // Importar Network

@Component({
  selector: 'app-detalle-bar',
  templateUrl: './detalle-bar.page.html',
  styleUrls: ['./detalle-bar.page.scss'],
})
export class DetalleBarPage implements OnInit {
  bar: Bar | undefined;
  mediaList: (Imagen | Video)[] = [];
  horarioDetails: string = '';
  isHorarioModalOpen: boolean = false;
  isFavorito: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private baresService: BaresService,
    private horariosService: HorariosService,
    private imagenesService: ImagenesService,
    private videosService: VideosService,
    private favoritosService: FavoritosService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.checkNetwork();
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id')!, 10);
      this.loadBarDetails(id);
      this.loadMedia(id);
      this.loadHorario(id);
      //this.checkIfFavorito(id);
    });
  }

  async checkNetwork() {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.presentToast('No tienes conexión a Internet');
    }

    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        this.presentToast('Conectado a Internet');
      } else {
        this.presentToast('No tienes conexión a Internet');
      }
    });
  }

  loadBarDetails(id: number) {
    this.baresService.getBar(id).subscribe(
      data => {
        this.bar = data;
      },
      error => {
        this.presentToast('Error al cargar los detalles del bar');
      }
    );
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loadMedia(id: number) {
    this.mediaList = [];
    this.imagenesService.getImagenes().subscribe(
      imagenes => {
        const imagenList = imagenes
          .filter(imagen => imagen.Bar_ID === id)
          .map(imagen => ({ ...imagen, tipo: 'imagen' }));
        this.mediaList = this.mediaList.concat(imagenList);
      },
      error => {
        this.presentToast('Error al cargar las imágenes');
      }
    );

    this.videosService.getVideos().subscribe(
      videos => {
        const videoList = videos
          .filter(video => video.Bar_ID === id)
          .map(video => ({ ...video, tipo: 'video' }));
        this.mediaList = this.mediaList.concat(videoList);
      },
      error => {
        this.presentToast('Error al cargar los videos');
      }
    );
  }

  /*checkIfFavorito(id: number) {
    this.favoritosService.getFavoritos().subscribe(
      favoritos => {
        this.isFavorito = favoritos.some(fav => fav.bar_id === id);
      },
      error => {
        this.presentToast('Error al verificar favoritos');
      }
    );
  }*/

 /* async toggleFavorito() {
    if (this.isFavorito) {
      await this.removeFromFavoritos();
    } else {
      await this.addToFavoritos();
    }
  }*/

  /*async addToFavoritos() {
    if (this.bar) {
      this.favoritosService.addFavorito(this.bar.ID).subscribe(
        async () => {
          this.isFavorito = true;
          await this.presentToast('Bar agregado a favoritos.');
        },
        async () => {
          await this.presentToast('Error al agregar a favoritos');
        }
      );
    }
  }*/

  /*async removeFromFavoritos() {
    if (this.bar) {
      this.favoritosService.getFavoritos().subscribe(
        favoritos => {
          const favorito = favoritos.find(fav => fav.bar_id === this.bar!.ID);
          if (favorito) {
            this.favoritosService.deleteFavorito(favorito.id).subscribe(
              async () => {
                this.isFavorito = false;
                await this.presentToast('Bar eliminado de favoritos.');
              },
              async () => {
                await this.presentToast('Error al eliminar de favoritos');
              }
            );
          }
        },
        async () => {
          await this.presentToast('Error al obtener favoritos');
        }
      );
    }
  }*/

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message',
    });

    await toast.present();
  }

  loadHorario(id: number) {
    this.horariosService.getHorario(id).subscribe(
      data => {
        if (data) {
          this.horarioDetails = `${data.Dia}\nApertura: ${data.HoraApertura}\nCierre: ${data.HoraCierre}`;
        }
      },
      error => {
        this.presentToast('Error al cargar el horario');
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  openHorarioModal() {
    this.isHorarioModalOpen = true;
  }

  navigateToLocal() {
    window.open('https://maps.google.com/?q=' + encodeURIComponent(this.bar?.Ubicacion || ''), '_blank');
  }

  reserve() {
    if (this.bar) {
      this.router.navigate(['/detalle-mesa', this.bar.ID]);
    }
  }
}
