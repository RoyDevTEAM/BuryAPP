import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  shotsYTragos = [
    { nombre: 'Malavita(Trago de la casa)', precio: 50 },
    { nombre: 'Tabla de shots(10 shots de la casa)', precio: 50 },
    { nombre: 'Tabla de tequila', precio: 20 },
    { nombre: 'Shot jagger', precio: 20 },
  ];

  vasosYCervezas = [
    { nombre: 'Fernet', precio: 20 },
    { nombre: 'Vodka', precio: 20 },
    { nombre: 'Tequila', precio: 25 },
    { nombre: 'Gin', precio: 25 },
    { nombre: 'Corona', precio: 25 },
    { nombre: 'Ron', precio: 20 },
    { nombre: 'Desatornillador', precio: 25 },
    { nombre: 'Sunrise', precio: 25 },
    { nombre: 'Pico de plata', precio: 25 },
    { nombre: 'Whisky', precio: 40 },
  ];

  botellas = [
    { nombre: 'Four Loko', precio: 50 },
  ];

  constructor() { }

  ngOnInit() { }
}