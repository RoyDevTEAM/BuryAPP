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
  fecha: string = ''; // Cambiado a string para manipulación más fácil
  hora: string | null = null;
  idMesa: string | null = null; 
  toastMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idMesa = params.get('id');
    });
  }

  enviarReserva() {
    if (this.nombre && this.numeroPersonas && this.fecha && this.hora && this.idMesa) {
      const mensaje = `Nombre: ${this.nombre}\nCantidad de Personas: ${this.numeroPersonas}\nFecha: ${this.fecha}\nHora: ${this.hora}\nID de Mesa: ${this.idMesa}`;
      const numeroTelefono = '+59163551738';
      this.enviarMensajeAWhatsApp(numeroTelefono, mensaje);
    } else {
      this.toastMessage = 'Todos los campos son requeridos.';
    }
  }

  autocompletarFecha(event: any) {
    let fecha = event.target.value.replace(/\D/g, ''); // Remueve todo excepto dígitos
    if (fecha.length >= 2) {
      fecha = fecha.substring(0, 2) + '/' + fecha.substring(2);
    }
    if (fecha.length >= 5) {
      fecha = fecha.substring(0, 5) + '/' + fecha.substring(5);
    }
    this.fecha = fecha;
  }

  goBack() {
    this.router.navigate(['/detalle-bar', this.idMesa]);
  }

  enviarMensajeAWhatsApp(numeroTelefono: string, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
  }
}
