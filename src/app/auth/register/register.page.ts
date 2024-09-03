import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model'; // Importa el modelo Usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    // Inicializa el formulario con campos y validadores
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required], // Agregamos el campo 'name'
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // Crea una instancia del modelo Usuario
      const usuario = new Usuario(0, name, email, password);

      try {
        // Llama al servicio de registro con el objeto Usuario
        const response = await this.authService.register(usuario).toPromise();
        this.router.navigate(['/login']); // Redirige al usuario a la página de inicio
        await this.presentToast('Registro exitoso', 'success');
      } catch (error) {
        await this.presentToast('Error en el registro, intenta de nuevo', 'danger');
      }
    } else {
      await this.presentToast('Por favor, completa todos los campos correctamente', 'warning');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}
