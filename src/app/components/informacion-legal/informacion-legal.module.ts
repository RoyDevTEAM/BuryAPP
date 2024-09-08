import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionLegalPageRoutingModule } from './informacion-legal-routing.module';

import { InformacionLegalPage } from './informacion-legal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionLegalPageRoutingModule
  ],
  declarations: [InformacionLegalPage]
})
export class InformacionLegalPageModule {}
