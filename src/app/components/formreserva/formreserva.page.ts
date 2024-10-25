import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaresService } from 'src/app/services/bares.service';
import { AuthService } from 'src/app/services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-formreserva',
  templateUrl: './formreserva.page.html',
  styleUrls: ['./formreserva.page.scss'],
})
export class FormreservaPage implements OnInit {
  nombreUsuario: string = ''; // Nuevo campo para el nombre del usuario obtenido del token
  numeroPersonas: number | null = null;
  fecha: string = ''; 
  hora: string | null = null;
  idMesa: string | null = null;
  idBar: number | null = null; // ID del bar
  nombreBar: string = ''; // Nombre del bar
  toastMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baresService: BaresService,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {
    // Obtener ID de mesa y bar desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.idMesa = params.get('id');
      this.idBar = +params.get('barId')!;

      // Obtener el nombre del bar
      this.obtenerNombreBar(this.idBar);
    });

    // Obtener el nombre del usuario desde el token
    this.authService.getUserInfo().subscribe(
      (usuario) => {
        this.nombreUsuario = usuario.name; // Asigna el nombre del usuario
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }

  obtenerNombreBar(id: number) {
    this.baresService.getBar(id).subscribe(
      (bar) => {
        this.nombreBar = bar.Nombre;
      },
      (error) => {
        console.error('Error al obtener el nombre del bar:', error);
      }
    );
  }

  enviarReserva() {
    if (this.nombreUsuario && this.numeroPersonas && this.fecha && this.hora && this.idMesa) {
      const mensaje = `Reserva: ${this.nombreBar}\nNombre: ${this.nombreUsuario}\nCantidad de Personas: ${this.numeroPersonas}\nFecha: ${this.fecha}\nHora: ${this.hora}\n Nro de Mesa: ${this.idMesa}`;
      const numeroTelefono = '+59163551738';
      this.enviarMensajeAWhatsApp(numeroTelefono, mensaje);
    } else {
      this.toastMessage = 'Todos los campos son requeridos.';
    }
  }

  autocompletarFecha(event: any) {
    let fecha = event.target.value.replace(/\D/g, '');
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