import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/eventos'; // URL base del backend para eventos

  constructor(private http: HttpClient) { }

  // Obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento por ID
  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo evento
  createEvento(evento: Evento): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  // Actualizar un evento existente
  updateEvento(id: number, evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar un evento
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
