import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';
import { SplashScreenPage } from './splash-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashScreenPageRoutingModule
  ],
  declarations: [SplashScreenPage],
  exports: [SplashScreenPage] // Export the NavBar component so it can be used in other modules

})
export class SplashScreenPageModule {}
