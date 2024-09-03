// src/app/models/horario.model.ts

export interface Horario {
    ID: number;
    Dia: string;
    HoraApertura: string; // Formato HH:mm
    HoraCierre: string; // Formato HH:mm
    Bar_ID?: number; // ID del bar al que pertenece el horario, si aplica
  }
  