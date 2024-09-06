import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorito } from '../models/favorito.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/favoritos'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los favoritos del usuario autenticado
  getFavoritos(): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Agregar un bar a favoritos
  addFavorito(bar_id: number): Observable<any> {
    return this.http.post(this.apiUrl, { bar_id }, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un favorito
  deleteFavorito(id: number): Observable<any> {
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
