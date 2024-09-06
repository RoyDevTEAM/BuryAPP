export class Evento {
    ID: number;
    Nombre: string;
    url_img?: string;
    url_video?: string;
    Bar_ID?: number; // Relación con Bar
  
    constructor(
      id: number,
      nombre: string,
      urlImg?: string,
      urlVideo?: string,
      barId?: number
    ) {
      this.ID = id;
      this.Nombre    = nombre;
      this.url_img = urlImg;
      this.url_video = urlVideo;
      this.Bar_ID = barId;
    }
  }
  