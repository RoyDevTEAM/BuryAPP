// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth'; // URL base corregida

  constructor(private http: HttpClient) { }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  }

  getUserInfo(): Observable<Usuario> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token de autenticación disponible.');
      return new Observable<Usuario>(); // Retorna un observable vacío si no hay token
    }
    
    return this.http.get<Usuario>(`${this.apiUrl}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
