import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard'; // Importa el guard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    //canActivate: [AuthGuard] // Protege la ruta con el guard
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home', // Redirige a 'home' por defecto
    pathMatch: 'full'
  },
  
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'nav-bar',
    loadChildren: () => import('./shared/nav-bar/nav-bar.module').then(m => m.NavBarPageModule)
  },
  {
    path: 'detalle-evento',
    loadChildren: () => import('./components/detalle-evento/detalle-evento.module').then(m => m.DetalleEventoPageModule)
  },
  {
    path: 'detalle-menu/:id',
    loadChildren: () => import('./components/detalle-menu/detalle-menu.module').then(m => m.DetalleMenuPageModule)
  },
  {
    path: 'detalle-eventos/:id',
    loadChildren: () => import('./components/detalle-eventos/detalle-eventos.module').then(m => m.DetalleEventosPageModule)
  },
  {
    path: 'detalle-mesa/:id',
    loadChildren: () => import('./components/detalle-mesa/detalle-mesa.module').then(m => m.DetalleMesaPageModule)
  },
  {
    path: 'detalle-bar/:id',
    loadChildren: () => import('./components/detalle-bar/detalle-bar.module').then(m => m.DetalleBarPageModule)
  },
  {
    path: 'formreserva/:id/:barId', // Cambiado para incluir ambos parámetros
    loadChildren: () => import('./components/formreserva/formreserva.module').then(m => m.FormreservaPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./components/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'terminos',
    loadChildren: () => import('./components/terminos/terminos.module').then(m => m.TerminosPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./components/error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./components/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'informacion-legal',
    loadChildren: () => import('./components/informacion-legal/informacion-legal.module').then(m => m.InformacionLegalPageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./components/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
