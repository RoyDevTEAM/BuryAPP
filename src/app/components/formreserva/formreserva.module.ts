import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormreservaPageRoutingModule } from './formreserva-routing.module';

import { FormreservaPage } from './formreserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormreservaPageRoutingModule
  ],
  declarations: [FormreservaPage]
})
export class FormreservaPageModule {}
