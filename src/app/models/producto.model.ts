// src/app/models/producto.model.ts

export interface Producto {
    ID: number;
    Nombre: string;
    Precio: number;
    Descripcion?: string;
    Bar_ID?: number; // ID del bar al que pertenece el producto, si aplica
  }
  