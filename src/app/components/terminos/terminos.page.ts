import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importa NavController para manejar la navegación

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
 // Método para navegar hacia atrás
 goBack() {
  this.navCtrl.navigateBack('/login'); // Navega a la página de login
}
}
