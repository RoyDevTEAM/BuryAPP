import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen.model';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/imagenes'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las imágenes y videos
  getImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl);
  }

  // Obtener una imagen por ID
  getImagen(id: number): Observable<Imagen> {
    return this.http.get<Imagen>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva imagen o video
  createImagen(imagen: FormData): Observable<any> {
    return this.http.post(this.apiUrl, imagen);
  }

  // Actualizar una imagen o video existente
  updateImagen(id: number, imagen: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, imagen);
  }

  // Eliminar una imagen o video
  deleteImagen(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
