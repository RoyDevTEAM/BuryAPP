// src/app/services/imagenes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Imagen[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener una imagen por ID
  getImagen(id: number): Observable<Imagen> {
    return this.http.get<Imagen>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear una nueva imagen o video
  createImagen(imagen: FormData): Observable<any> {
    return this.http.post(this.apiUrl, imagen, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar una imagen o video existente
  updateImagen(id: number, imagen: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, imagen, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar una imagen o video
  deleteImagen(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Método para obtener las cabeceras de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Obtiene el token de autenticación del almacenamiento local
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
