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
import { ToastController } from '@ionic/angular'; // Importar ToastController

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
    private toastController: ToastController // Inyectar ToastController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id')!, 10);
      this.loadBarDetails(id);
      this.loadMedia(id);
      this.loadHorario(id);
      this.checkIfFavorito(id);
    });
  }

  loadBarDetails(id: number) {
    this.baresService.getBar(id).subscribe(data => {
      this.bar = data;
    });
  }

  loadMedia(id: number) {
    this.mediaList = [];
    this.imagenesService.getImagenes().subscribe(imagenes => {
      const imagenList = imagenes
        .filter(imagen => imagen.Bar_ID === id)
        .map(imagen => ({ ...imagen, tipo: 'imagen' }));
      this.mediaList = this.mediaList.concat(imagenList);
    });

    this.videosService.getVideos().subscribe(videos => {
      const videoList = videos
        .filter(video => video.Bar_ID === id)
        .map(video => ({ ...video, tipo: 'video' }));
      this.mediaList = this.mediaList.concat(videoList);
    });
  }

  checkIfFavorito(id: number) {
    this.favoritosService.getFavoritos().subscribe(favoritos => {
      this.isFavorito = favoritos.some(fav => fav.bar_id === id);
    });
  }

  async toggleFavorito() {
    if (this.isFavorito) {
      await this.removeFromFavoritos();
    } else {
      await this.addToFavoritos();
    }
  }

  async addToFavoritos() {
    if (this.bar) {
      this.favoritosService.addFavorito(this.bar.ID).subscribe(async () => {
        this.isFavorito = true;
        await this.presentToast('Bar agregado a favoritos.');
      });
    }
  }

  async removeFromFavoritos() {
    if (this.bar) {
      this.favoritosService.getFavoritos().subscribe(favoritos => {
        const favorito = favoritos.find(fav => fav.bar_id === this.bar!.ID);
        if (favorito) {
          this.favoritosService.deleteFavorito(favorito.id).subscribe(async () => {
            this.isFavorito = false;
            await this.presentToast('Bar eliminado de favoritos.');
          });
        }
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-message',
    });

    await toast.present();
  }

  getVideoEmbedUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1]?.split('&')[0];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  loadHorario(id: number) {
    this.horariosService.getHorario(id).subscribe(data => {
      if (data) {
        this.horarioDetails = `Día: ${data.Dia}\nApertura: ${data.HoraApertura}\nCierre: ${data.HoraCierre}`;
      }
    });
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
