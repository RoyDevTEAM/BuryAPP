import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { BaresService } from 'src/app/services/bares.service';
import { Producto } from 'src/app/models/producto.model';
import { Bar } from 'src/app/models/bar.model';

@Component({
  selector: 'app-detalle-menu',
  templateUrl: './detalle-menu.page.html',
  styleUrls: ['./detalle-menu.page.scss'],
})
export class DetalleMenuPage implements OnInit {
  productos: Producto[] = [];
  barId: number | null = null;
  barName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private baresService: BaresService // Inyección del servicio BaresService
  ) {}

  ngOnInit() {
    // Obtener el ID del bar de la ruta
    this.route.paramMap.subscribe(params => {
      this.barId = parseInt(params.get('id')!, 10);
      if (this.barId) {
        this.loadBarInfo(this.barId); // Cargar información del bar
        this.loadProductos(this.barId); // Cargar productos del bar
      }
    });
  }

  goBack() {
    this.router.navigate(['/detalle-bar', this.barId]); // Asegúrate de usar el ID correcto del bar
  }

  loadProductos(barId: number) {
    this.productosService.getProductos().subscribe(productos => {
      // Filtrar productos que pertenecen al bar con el ID proporcionado
      this.productos = productos.filter(producto => producto.Bar_ID === barId);
    });
  }

  // Método para cargar la información del bar
  loadBarInfo(barId: number) {
    this.baresService.getBar(barId).subscribe(bar => {
      this.barName = bar.Nombre; // Suponiendo que el modelo Bar tiene una propiedad Nombre
    });
  }
}
