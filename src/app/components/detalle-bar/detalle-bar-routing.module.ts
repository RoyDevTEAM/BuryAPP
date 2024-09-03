import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleBarPage } from './detalle-bar.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleBarPage
  },
  {
    path: ':id',
    component: DetalleBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleBarPageRoutingModule {}
