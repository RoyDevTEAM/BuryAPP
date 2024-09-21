import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/auth'; // URL base corregida

  constructor(private http: HttpClient) { }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true // Importante para manejar cookies con Sanctum
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true // Importante para manejar cookies con Sanctum
    });
  }

  logout(): Observable<any> {
    const token = this.getToken(); // Obteniendo el token del almacenamiento local
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true // Importante para manejar cookies con Sanctum
    }).pipe(
      // Eliminando el token del almacenamiento local después de la respuesta
      tap(() => localStorage.removeItem('auth_token'))
    );
  }

  getUserInfo(): Observable<Usuario> {
    const token = this.getToken(); // Obteniendo el token del almacenamiento local
    if (!token) {
      console.error('No hay token de autenticación disponible.');
      return new Observable<Usuario>(); // Retorna un observable vacío si no hay token
    }

    return this.http.get<Usuario>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }),
      withCredentials: true // Importante para manejar cookies con Sanctum
    });
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken(); // Devuelve true si hay token, false si no.
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
