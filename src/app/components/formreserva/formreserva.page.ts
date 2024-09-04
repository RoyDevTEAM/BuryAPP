import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formreserva',
  templateUrl: './formreserva.page.html',
  styleUrls: ['./formreserva.page.scss'],
})
export class FormreservaPage implements OnInit {
  nombre: string = '';
  numeroPersonas: number | null = null;
  fecha: string | null = null;
  hora: string | null = null;
  idMesa: string | null = null; // Propiedad para almacenar el ID de la mesa
  mostrarFecha: boolean = false;
  toastMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el codd maaID de la mesa de la URL
    this.route.paramMap.subscribe(params => {
      this.idMesa = params.get('id'); // ID de la mesa desde la URL
    });
  }

  enviarReserva() {
    if (this.nombre && this.numeroPersonas && this.fecha && this.hora && this.idMesa) {
      const mensaje = `MALAVITA\nNombre: ${this.nombre}\nCantidad de Personas: ${this.numeroPersonas}\nFecha: ${this.fecha}\nHora: ${this.hora}\nID de Mesa: ${this.idMesa}`;
      const numeroTelefono = '+59163551738';
      this.enviarMensajeAWhatsApp(numeroTelefono, mensaje);
    } else {
      this.toastMessage = 'Todos los campos son requeridos.';
    }
  }

  goBack() {
    this.router.navigate(['/detalle-bar', this.idMesa]); // Asegúrate de usar el ID correcto del bar si es necesario
  }

  enviarMensajeAWhatsApp(numeroTelefono: string, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
  }

  toggleFecha() {
    this.mostrarFecha = !this.mostrarFecha;
  }
}
