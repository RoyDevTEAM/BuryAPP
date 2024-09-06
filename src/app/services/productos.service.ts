// src/app/services/productos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://buryapp-backend.onrender.com/api/productos'; // URL base del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Obtener un producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto, {
      headers: this.getAuthHeaders()
    });
  }

  // Actualizar un producto existente
  updateProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<any> {
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
