import { Bar } from './bar.model'; // Asegúrate de que la ruta al archivo del modelo Bar sea correcta

export class Favorito {
  id: number;
  user_id: number;
  bar_id: number;
  bar: Bar; // Usa el modelo Bar en lugar de any

  constructor(
    id: number,
    user_id: number,
    bar_id: number,
    bar: Bar
  ) {
    this.id = id;
    this.user_id = user_id;
    this.bar_id = bar_id;
    this.bar = bar;
  }
}
