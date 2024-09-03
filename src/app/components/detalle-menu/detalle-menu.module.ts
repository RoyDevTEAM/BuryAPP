import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMenuPageRoutingModule } from './detalle-menu-routing.module';

import { DetalleMenuPage } from './detalle-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMenuPageRoutingModule
  ],
  declarations: [DetalleMenuPage]
})
export class DetalleMenuPageModule {}
