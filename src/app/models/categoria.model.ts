// src/app/models/categoria.model.ts

export interface Categoria {
    ID: number; // ID de la categoría
    nombre: string; // Nombre de la categoría
    descripcion?: string; // Descripción de la categoría (opcional)
    estado: boolean; // Estado de la categoría (activo/inactivo)
  }
  