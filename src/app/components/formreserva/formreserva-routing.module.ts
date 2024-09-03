import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormreservaPage } from './formreserva.page';

const routes: Routes = [
  {
    
    path: '',
    component: FormreservaPage
  },
  {
    path: ':id',
    component: FormreservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormreservaPageRoutingModule {}
