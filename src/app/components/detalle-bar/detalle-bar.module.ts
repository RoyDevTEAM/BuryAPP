import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleBarPageRoutingModule } from './detalle-bar-routing.module';

import { DetalleBarPage } from './detalle-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleBarPageRoutingModule
  ],
  declarations: [DetalleBarPage],
  exports: [DetalleBarPage] // Export the NavBar component so it can be used in other modules


})
export class DetalleBarPageModule {}
