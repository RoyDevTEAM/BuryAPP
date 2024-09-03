// src/app/models/imagen.model.ts

export interface Imagen {
    ID: number;
    Titulo?: string;
    URL: string; // URL del archivo almacenado (puede ser imagen o video)
    Bar_ID?: number; // ID del bar al que pertenece la imagen, si aplica
    tipo?:string;

  }
  