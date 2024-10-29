import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/videos'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los videos
  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  // Obtener un video por ID
  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo video
  createVideo(video: FormData): Observable<any> {
    return this.http.post(this.apiUrl, video);
  }

  // Actualizar un video existente
  updateVideo(id: number, video: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, video);
  }

  // Eliminar un video
  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
