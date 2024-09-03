// src/app/services/horarios.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = 'http://localhost:8000/api/horarios'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los horarios
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener un horario por ID
  getHorario(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear un nuevo horario
  createHorario(horario: Horario): Observable<any> {
    return this.http.post(this.apiUrl, horario, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar un horario existente
  updateHorario(id: number, horario: Horario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, horario, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un horario
  deleteHorario(id: number): Observable<any> {
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
