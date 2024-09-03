import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NavBarPageModule } from '../shared/nav-bar/nav-bar.module'; // Import the NavBarModule

import { HomePageRoutingModule } from './home-routing.module';
import { DetalleBarPageModule } from '../components/detalle-bar/detalle-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NavBarPageModule,
    DetalleBarPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
