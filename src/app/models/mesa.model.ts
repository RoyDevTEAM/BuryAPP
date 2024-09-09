// src/app/models/mesa.model.ts

export interface Mesa {
    id: number;
    Descripcion?: string;
    Precio: number;
    Anticipo: number;
    Bar_ID?: number; // ID del bar al que pertenece la mesa, si aplica
    Imagen?: string; // URL de la imagen asociada a la mesa, si aplica
  }
  