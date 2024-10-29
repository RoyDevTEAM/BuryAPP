import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/horarios'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los horarios
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  // Obtener un horario por ID
  getHorario(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo horario
  createHorario(horario: Horario): Observable<any> {
    return this.http.post(this.apiUrl, horario);
  }

  // Actualizar un horario existente
  updateHorario(id: number, horario: Horario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, horario);
  }

  // Eliminar un horario
  deleteHorario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
