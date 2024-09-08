import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionLegalPage } from './informacion-legal.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionLegalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionLegalPageRoutingModule {}
