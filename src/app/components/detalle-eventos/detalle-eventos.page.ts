import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Evento } from 'src/app/models/event.model';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-detalle-eventos',
  templateUrl: './detalle-eventos.page.html',
  styleUrls: ['./detalle-eventos.page.scss'],
})
export class DetalleEventosPage implements OnInit {
  evento: Evento | undefined;
  barId: number | null = null; // ID del bar para mantener el contexto de navegación

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
       this.barId = parseInt(params.get('id')!, 10);
      if (this.barId) {
        this.loadEventoDetails(this.barId);
      } });
  
  }

  loadEventoDetails(id: number) {
    this.eventosService.getEvento(id).subscribe(data => {
      this.evento = data;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    if (this.barId) {
      this.router.navigate(['/detalle-bar', this.barId]); // Navegar de vuelta usando el ID del bar
    } 
  }
}
