import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCitasPageRoutingModule } from './ver-citas-routing.module';

import { VerCitasPage } from './ver-citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCitasPageRoutingModule
  ],
  declarations: [VerCitasPage]
})
export class VerCitasPageModule {}
