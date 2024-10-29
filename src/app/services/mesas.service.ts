import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  // Obtener una mesa por ID
  getMesa(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva mesa
  createMesa(mesa: Mesa): Observable<any> {
    return this.http.post(this.apiUrl, mesa);
  }

  // Actualizar una mesa existente
  updateMesa(id: number, mesa: Mesa): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mesa);
  }

  // Eliminar una mesa
  deleteMesa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
