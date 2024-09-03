import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavBarPageRoutingModule } from './nav-bar-routing.module';

import { NavBarPage } from './nav-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavBarPageRoutingModule
  ],
  declarations: [NavBarPage],
  exports: [NavBarPage] // Export the NavBar component so it can be used in other modules

})
export class NavBarPageModule {}
