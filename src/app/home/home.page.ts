import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaresService } from '../services/bares.service';
import { CategoriasService } from '../services/categorias.service';
import { Bar } from '../models/bar.model';
import { Categoria } from '../models/categoria.model';
import { Network } from '@capacitor/network';

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
  isConnected: boolean = true; // Estado de conexión

  constructor(
    private baresService: BaresService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkNetworkStatus();
    this.loadBares();
    this.loadCategorias();
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;

    // Escucha cambios en el estado de conexión
    Network.addListener('networkStatusChange', (status) => {
      this.isConnected = status.connected;
    });
  }

  reloadPage() {
    window.location.reload();
  }

  

  loadCategorias() {
    if (this.isConnected) {
      this.categoriasService.getCategorias().subscribe(data => {
        this.categorias = data;
      });
    }
  }

  filterBares(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredBares = this.bares.filter(bar =>
      bar.Nombre.toLowerCase().includes(searchValue) ||
      bar.Descripcion?.toLowerCase().includes(searchValue)
    );
  }

  filterByCategoria(categoriaID: number | null, event: Event) {
    event.stopPropagation();
    this.filteredBares = this.bares.filter(bar => bar.Categoria_ID === categoriaID);
  }

  resetFilter(event: Event) {
    if (!(event.target as HTMLElement).closest('.category-filters')) {
      this.filteredBares = this.bares;
    }
  }

  getCategoriaNombre(categoriaID: number | undefined): string {
    const categoria = this.categorias.find(c => c.ID === categoriaID);
    return categoria ? categoria.nombre : 'Sin Categoría';
  }

  goToBarDetail(barID: number) {
    this.router.navigate(['/detalle-bar', barID]);
  }
}
