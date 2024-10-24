import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
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
      withCredentials: true
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
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    const token = this.getToken();
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      tap(() => localStorage.removeItem('auth_token'))
    );
  }

  getUserInfo(): Observable<Usuario> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token de autenticación disponible.');
      return new Observable<Usuario>();
    }

    return this.http.get<Usuario>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }

  getUserById(id: string): Observable<Usuario> {
    const token = this.getToken();
    return this.http.get<Usuario>(`${this.apiUrl}/user/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }

  updateUser(id: string, usuario: Partial<Usuario>): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}/user/${id}`, usuario, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }

  deleteUser(id: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(`${this.apiUrl}/user/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }
  deleteAccount(): Observable<any> {
    const token = this.getToken(); // Obtiene el token del almacenamiento local
    return this.getUserInfo().pipe(
      switchMap((usuario: Usuario) => {
        return this.http.delete(`${this.apiUrl}/user/${usuario.id}`, {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
          withCredentials: true
        });
      })
    );
  }
  

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
