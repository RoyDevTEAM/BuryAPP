// home.page.ts

import { Component, OnInit } from '@angular/core';
import { BaresService } from '../services/bares.service';
import { CategoriasService } from '../services/categorias.service';
import { Bar } from '../models/bar.model';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  bares: Bar[] = [];
  filteredBares: Bar[] = [];
  categorias: Categoria[] = [];
  searchTerm: string = '';

  constructor(private baresService: BaresService, private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.loadBares();
    this.loadCategorias();
  }

  loadBares() {
    this.baresService.getBares().subscribe(data => {
      this.bares = data;
      this.filteredBares = this.bares;
    });
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  filterBares(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredBares = this.bares.filter(bar => 
      bar.Nombre.toLowerCase().includes(searchValue) ||
      bar.Descripcion?.toLowerCase().includes(searchValue)
    );
  }

  filterByCategoria(categoriaID: number | null) {
    if (categoriaID !== null) {
      this.filteredBares = this.bares.filter(bar => bar.Categoria_ID === categoriaID);
    } else {
      this.filteredBares = this.bares;
    }
  }

  getCategoriaNombre(categoriaID: number | undefined): string {
    const categoria = this.categorias.find(c => c.ID === categoriaID);
    return categoria ? categoria.nombre : 'Sin Categoría';
  }
}
