// src/app/services/videos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = 'http://localhost:8000/api/videos'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los videos
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener un video por ID
  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear un nuevo video
  createVideo(video: FormData): Observable<any> {
    return this.http.post(this.apiUrl, video, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar un video existente
  updateVideo(id: number, video: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, video, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un video
  deleteVideo(id: number): Observable<any> {
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
