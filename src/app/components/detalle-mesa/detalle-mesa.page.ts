import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa.model';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.page.html',
  styleUrls: ['./detalle-mesa.page.scss'],
})
export class DetalleMesaPage implements OnInit {
  mesas: Mesa[] = [];
  barId: number | null = null; // ID del bar para filtrar las mesas

  constructor(
    private mesasService: MesasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.barId = parseInt(params.get('id')!, 10);
      if (this.barId) {
        this.loadMesas(this.barId);
      }
    });
  }

  loadMesas(barId: number) {
    this.mesasService.getMesas().subscribe(data => {
      // Filtrar mesas por el ID del bar
      this.mesas = data.filter(mesa => mesa.Bar_ID === barId);
    });
  }
  goBack() {
    this.router.navigate(['/detalle-bar', this.barId]); // Asegúrate de usar el ID correcto del bar
  }
  goToReservaForm(mesaId: number) {
    this.router.navigate([`/formreserva/${mesaId}`]); // Navegar al formulario de reserva
  }
}
