import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bar } from '../models/bar.model';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class BaresService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/bares'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los bares
  getBares(): Observable<Bar[]> {
    return this.http.get<Bar[]>(this.apiUrl);
  }

  // Método para obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8000/api/categorias');
  }

  // Obtener un bar por ID
  getBar(id: number): Observable<Bar> {
    return this.http.get<Bar>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo bar
  createBar(bar: Bar): Observable<any> {
    return this.http.post(this.apiUrl, bar);
  }

  // Actualizar un bar existente
  updateBar(id: number, bar: Bar): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bar);
  }

  // Eliminar un bar
  deleteBar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
