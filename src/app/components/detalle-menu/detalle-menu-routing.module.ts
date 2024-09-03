import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMenuPage } from './detalle-menu.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMenuPage
  },
  {
    path: ':id',
    component: DetalleMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMenuPageRoutingModule {}
