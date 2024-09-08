import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-informacion-legal',
  templateUrl: './informacion-legal.page.html',
  styleUrls: ['./informacion-legal.page.scss'],
})
export class InformacionLegalPage implements OnInit {

  constructor( 
    private router:Router) { }

  ngOnInit() {
  }
  goBack() {
    
      this.router.navigate(['/home']); // Navegar de vuelta usando el ID del bar
    
  }
}
