// src/app/services/mesas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/mesas'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las mesas
  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener una mesa por ID
  getMesa(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear una nueva mesa
  createMesa(mesa: Mesa): Observable<any> {
    return this.http.post(this.apiUrl, mesa, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar una mesa existente
  updateMesa(id: number, mesa: Mesa): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mesa, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar una mesa
  deleteMesa(id: number): Observable<any> {
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
