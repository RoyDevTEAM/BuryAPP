import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bar } from '../models/bar.model';
import { Categoria } from '../models/categoria.model';



@Injectable({
  providedIn: 'root'
})
export class BaresService {
  private apiUrl = 'http://localhost:8000/api/bares'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los bares
  getBares(): Observable<Bar[]> {
    return this.http.get<Bar[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

   // Método para obtener todas las categorías
   getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8000/api/categorias', {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener un bar por ID
  getBar(id: number): Observable<Bar> {
    return this.http.get<Bar>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear un nuevo bar
  createBar(bar: Bar): Observable<any> {
    return this.http.post(this.apiUrl, bar, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar un bar existente
  updateBar(id: number, bar: Bar): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bar, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un bar
  deleteBar(id: number): Observable<any> {
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
