// src/app/models/video.model.ts

export interface Media {
    ID: number;
    Titulo?: string;
    URL: string; // URL del video almacenado
    Bar_ID?: number; // ID del bar al que pertenece el video, si aplica
  }
  